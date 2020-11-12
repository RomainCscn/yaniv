import { getFormattedPlayers } from '../core/room';
import { Card, Room, User, Users } from '../types';

export const removePreviousCards = (room: Room): void => {
  Object.entries(room.users).forEach(([, user]: [string, User]) =>
    user.ws.send(JSON.stringify({ type: 'SET_PREVIOUS_CARDS', previousCards: [] })),
  );
};

export const sendPlayersUpdate = (room: Room): void => {
  Object.entries(room.users).forEach(([, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', players: getFormattedPlayers(room) }));
  });
};

export const sendThrownCards = (users: Users, cards: Card[]): void => {
  let sortedCards: Card[] = [];

  if (cards.findIndex((c: Card) => c.suit === 'joker') === -1) {
    sortedCards = cards.sort((a, b) => a.value - b.value);
  } else {
    sortedCards = cards.filter((c) => c.suit !== 'joker').sort((a, b) => a.value - b.value);

    const cardGapIndex =
      sortedCards.findIndex(
        (card, index) => sortedCards[index + 1] && card.value + 2 === sortedCards[index + 1].value,
      ) + 1; // + 1 here because we removed the joker (in case of J 2 4 cards where J = 0)

    sortedCards.splice(cardGapIndex, 0, { suit: 'joker', value: 0 });
  }

  Object.entries(users).forEach(([, user]: [string, User]) =>
    user.ws.send(JSON.stringify({ type: 'SET_THROWN_CARDS', thrownCards: sortedCards })),
  );
};
