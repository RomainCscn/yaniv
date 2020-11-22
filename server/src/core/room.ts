import { getHand, getSuffledDeck } from './game';
import rooms from './rooms';
import { Card, CustomWebSocket, FormattedPlayer, Room, Player } from '../types';

export const assignHandToPlayer = (room: Room, player: Player): void => {
  const playerHand = getHand(room, player.sort);

  player.hand = playerHand;
  room.deck = room.deck.slice(room.configuration.handCardsNumber);
};

export const addPlayer = (
  playerUuid: string,
  room: Room,
  { avatar, sessionUuid, sort, username }: Player,
  playerWs: CustomWebSocket,
): void => {
  room.players[playerUuid] = {
    avatar,
    hand: [],
    score: 0,
    scoreHistory: [],
    sessionUuid,
    sort: sort || { order: 'asc', type: 'suit' },
    username,
    uuid: playerUuid,
    ws: playerWs,
  };
};

export const findRoom = (sessionUuid: string): [string, Room] | [] => {
  for (const [roomId, room] of Object.entries(rooms)) {
    if (Object.values(room.players).find((player) => player.sessionUuid === sessionUuid)) {
      return [roomId, room];
    }
  }

  return [];
};

export const getPlayerByUuid = (room: Room, playerUuid: string): Player => room.players[playerUuid];

export const getPlayerUuidBySessionUuid = (room: Room, sessionUuid: string): string | undefined =>
  Object.values(room.players).find((player) => player.sessionUuid === sessionUuid)?.uuid;

export const getFormattedPlayers = (room: Room): FormattedPlayer[] =>
  Object.values(room.players)
    .filter((player) => player.ws.readyState !== player.ws.CLOSED)
    .map((player) => ({
      avatar: player.avatar,
      numberOfCards: player.hand.length,
      sort: player.sort,
      uuid: player.uuid,
      username: player.username,
    }));

export const getFormattedPlayer = (room: Room, uuid: string): FormattedPlayer => {
  const { avatar: avatar, hand, sort, username } = room.players[uuid];

  return {
    avatar,
    numberOfCards: hand.length,
    sort,
    username,
    uuid,
  };
};

export const getPlayersScore = (
  room: Room,
): Pick<Player, 'score' | 'scoreHistory' | 'username'>[] =>
  Object.entries(room.players).map(([uuid, player]: [string, Player]) => ({
    score: player.score,
    scoreHistory: player.scoreHistory,
    uuid,
    username: player.username,
  }));

export const getSortedCards = (cards: Card[]): Card[] => {
  let sortedCards: Card[] = [];
  const jokerCard = cards.find((c: Card) => c.suit === 'joker');

  if (!jokerCard) {
    sortedCards = cards.sort((a, b) => a.value - b.value);
  } else {
    sortedCards = cards.filter((c) => c.suit !== 'joker').sort((a, b) => a.value - b.value);

    const cardGapIndex =
      sortedCards.findIndex(
        (card, index) => sortedCards[index + 1] && card.value + 2 === sortedCards[index + 1].value,
      ) + 1; // + 1 here because we removed the joker (in case of J 2 4 cards where J = 98 or 99)

    sortedCards.splice(cardGapIndex, 0, jokerCard);
  }

  return sortedCards;
};

export const resetRoom = (
  room: Room,
  { resetScore = false, resetActivePlayer = false } = {},
): void => {
  room.deck = getSuffledDeck();
  room.thrownCards = [];
  room.activePlayer = resetActivePlayer ? null : room.roundWinner || Object.keys(room.players)[0];
  room.roundWinner = null;

  if (resetScore) {
    Object.entries(room.players).forEach(([, player]) => {
      player.score = 0;
      player.scoreHistory = [];
    });
  }
};

export const updatePlayer = (room: Room, playerUuid: string, player: Partial<Player>): void => {
  room.players[playerUuid] = { ...room.players[playerUuid], ...player };
};

export default function initRoom(): Room {
  return {
    activePlayer: null,
    configuration: { handCardsNumber: 7, scoreLimit: 200 },
    deck: getSuffledDeck(),
    roundWinner: null,
    thrownCards: [],
    players: {},
  };
}
