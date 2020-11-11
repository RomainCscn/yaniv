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
  Object.entries(users).forEach(([, user]: [string, User]) =>
    user.ws.send(JSON.stringify({ type: 'SET_THROWN_CARDS', thrownCards: cards })),
  );
};
