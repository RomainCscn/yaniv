import { sortHand } from '../../core/game/cards';
import { Player } from '../../core/player';
import { Room } from '../../core/room';
import { Card, PlayedCards } from '../../types';

const getNextPlayerUuid = (playersUuid: string[], activePlayerIndex: number) =>
  activePlayerIndex === playersUuid.length - 1
    ? playersUuid[0]
    : playersUuid[activePlayerIndex + 1];

const getNewCardInHand = (
  room: Room,
  player: Player,
  { notPickedCards, pickedCard }: Partial<PlayedCards>,
) => {
  let newCardInHand = { card: pickedCard, isFromStack: false };

  // player picked one card from mutiple thrown cards
  if (pickedCard && notPickedCards) {
    player.hand = sortHand([...player.hand, pickedCard], player.sort);
    room.deck.push(...notPickedCards);
    // player picked the thrown card
  } else if (pickedCard) {
    player.hand = sortHand([...player.hand, pickedCard], player.sort);
    // player picked one card from the stack
  } else if (notPickedCards) {
    newCardInHand = { card: room.deck[0], isFromStack: true };
    player.hand = sortHand([...player.hand, room.deck[0]], player.sort);
    room.deck = room.deck.slice(1);
    room.deck.push(...notPickedCards);
  }

  return newCardInHand;
};

export const handleDropAndPick = (
  room: Room,
  player: Player,
  { notPickedCards, pickedCard, thrownCards }: PlayedCards,
): void => {
  room.thrownCards = thrownCards;
  room.dispatch({ type: 'SET_THROWN_CARDS', data: { thrownCards: room.getSortedThrownCards() } });

  thrownCards.forEach((card: Card) => player.removeCardFromHand(card));

  const newCardInHand = getNewCardInHand(room, player, { notPickedCards, pickedCard });
  player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand, newCardInHand }));

  const playersUuid = Object.entries(room.players).map(([uuid]) => uuid);
  const previousPlayer = room.getFormattedPlayer(room.activePlayer || '');
  const activePlayerIndex = playersUuid.indexOf(room.activePlayer || '');

  const nextPlayerUuid = getNextPlayerUuid(playersUuid, activePlayerIndex);
  room.activePlayer = nextPlayerUuid;

  // sync players to display other players cards
  Object.entries(room.players).forEach(([, player]: [string, Player]) => {
    player.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: nextPlayerUuid }));
    player.ws.send(JSON.stringify({ type: 'SET_PICKED_CARD', pickedCard, previousPlayer }));
    player.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', players: room.getFormattedPlayers() }));
  });
};
