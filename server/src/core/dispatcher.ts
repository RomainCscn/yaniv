import { getFormattedPlayers, getSortedCards } from '../core/room';
import { Message, Room } from '../types';

export const removePreviousCards = (room: Room): void => {
  Object.values(room.users).forEach((user) =>
    user.ws.send(JSON.stringify({ type: 'SET_PREVIOUS_CARDS', previousCards: [] })),
  );
};

export const sendPlayersUpdate = (room: Room): void => {
  Object.values(room.users).forEach((user) => {
    user.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', players: getFormattedPlayers(room) }));
  });
};

export const sendBackToLobby = (room: Room): void => {
  Object.values(room.users).forEach((user) => {
    user.ws.send(JSON.stringify({ type: 'BACK_TO_LOBBY' }));
  });
};

export const sendConfiguration = (room: Room): void => {
  Object.values(room.users).forEach((user) =>
    user.ws.send(
      JSON.stringify({ type: 'CONFIGURATION_UPDATE', configuration: room.configuration }),
    ),
  );
};

export const sendMessage = (room: Room, message: Message): void => {
  Object.values(room.users).forEach((user) =>
    user.ws.send(JSON.stringify({ type: 'NEW_MESSAGE', message })),
  );
};

export const sendStartGame = (room: Room): void =>
  Object.values(room.users).forEach((user) => {
    user.ws.send(JSON.stringify({ type: 'START_GAME', players: getFormattedPlayers(room) }));
  });

export const sendThrownCards = (room: Room): void => {
  Object.values(room.users).forEach((user) =>
    user.ws.send(
      JSON.stringify({ type: 'SET_THROWN_CARDS', thrownCards: getSortedCards(room.thrownCards) }),
    ),
  );
};
