import { Card, Room, User, Users } from './types';

const removePreviousCards = (room: Room): void => {
  Object.entries(room.users).forEach(([, user]: [string, User]) =>
    user.ws.send(JSON.stringify({ type: 'SET_PREVIOUS_CARDS', previousCards: [] })),
  );
};

const sendActiveCards = (users: Users, cards: Card[]): void => {
  Object.entries(users).forEach(([, user]: [string, User]) =>
    user.ws.send(JSON.stringify({ type: 'SET_ACTIVE_CARDS', activeCards: cards })),
  );
};

const sendCardsNumberToOtherPlayers = (
  users: Users,
  userUuid: string,
  numberOfCards: number,
): void => {
  Object.entries(users).forEach(([, user]: [string, User]) => {
    user.ws.send(
      JSON.stringify({
        type: 'SET_OTHER_PLAYERS_CARDS',
        player: { uuid: userUuid, numberOfCards },
      }),
    );
  });
};

export { removePreviousCards, sendActiveCards, sendCardsNumberToOtherPlayers };
