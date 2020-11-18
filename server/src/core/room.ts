import { getHand, getSuffledDeck } from './game';
import rooms from './rooms';
import { Card, CustomWebSocket, FormattedPlayer, Room, User } from '../types';

export const assignHandToPlayer = (room: Room, user: User): void => {
  const userHand = getHand(room, user.sortOrder);

  user.hand = userHand;
  room.deck = room.deck.slice(room.configuration.handCardsNumber);
};

export const addUser = (
  userUuid: string,
  room: Room,
  { avatar, sessionUuid, username }: User,
  userWs: CustomWebSocket,
): void => {
  room.users[userUuid] = {
    avatar,
    hand: [],
    score: 0,
    scoreHistory: [],
    sessionUuid,
    sortOrder: 'asc',
    username,
    uuid: userUuid,
    ws: userWs,
  };
};

export const findRoom = (sessionUuid: string): [string, Room] | [] => {
  for (const [roomId, room] of Object.entries(rooms)) {
    if (Object.values(room.users).find((user) => user.sessionUuid === sessionUuid)) {
      return [roomId, room];
    }
  }

  return [];
};

export const getPlayerByUuid = (room: Room, userUuid: string): User => room.users[userUuid];

export const getPlayerUuidBySessionUuid = (room: Room, sessionUuid: string): string | undefined =>
  Object.values(room.users).find((user) => user.sessionUuid === sessionUuid)?.uuid;

export const getFormattedPlayers = (room: Room): FormattedPlayer[] =>
  Object.values(room.users)
    .filter((user) => user.ws.readyState !== user.ws.CLOSED)
    .map((user) => ({
      avatar: user.avatar,
      numberOfCards: user.hand.length,
      sortOrder: user.sortOrder,
      uuid: user.uuid,
      username: user.username,
    }));

export const getFormattedPlayer = (room: Room, uuid: string): FormattedPlayer => {
  const { avatar: avatar, hand, sortOrder, username } = room.users[uuid];

  return {
    avatar,
    numberOfCards: hand.length,
    sortOrder,
    username,
    uuid,
  };
};

export const getPlayersScore = (room: Room): Pick<User, 'score' | 'scoreHistory' | 'username'>[] =>
  Object.entries(room.users).map(([uuid, user]: [string, User]) => ({
    score: user.score,
    scoreHistory: user.scoreHistory,
    uuid,
    username: user.username,
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
  room.activePlayer = resetActivePlayer ? null : room.roundWinner || Object.keys(room.users)[0];
  room.roundWinner = null;

  if (resetScore) {
    Object.entries(room.users).forEach(([, user]) => {
      user.score = 0;
      user.scoreHistory = [];
    });
  }
};

export default function initRoom(): Room {
  return {
    activePlayer: null,
    configuration: { handCardsNumber: 7, scoreLimit: 200 },
    deck: getSuffledDeck(),
    roundWinner: null,
    thrownCards: [],
    users: {},
  };
}
