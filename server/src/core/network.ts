import * as WebSocket from 'ws';

import { findRoom } from './helpers';
import { Player } from './player';
import { Room } from './room';
import rooms from './rooms';
import logger from '../logger';

const getUniqueWsState = (players: Player[]) => new Set(players.map(({ ws }) => ws.readyState));

const removeRoom = (roomId: string) => {
  delete rooms[roomId];
  logger.info({ roomId }, 'Room deleted');
};

const dispatchUpdate = (room: Room, playerUuid: string) => {
  logger.info({ roomId: room.roomId, playerUuid }, 'Player quit an ongoing game');
  room.dispatch({ type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } });
};

export const handleWebSocketClosed = (sessionUuid: string): void => {
  const room = findRoom(rooms, sessionUuid);

  if (room) {
    const wsState = getUniqueWsState(room.getPlayers());
    const wsAllClosed = wsState.size === 1 && wsState.has(WebSocket.CLOSED);

    if (wsAllClosed) {
      removeRoom(room.roomId);
    } else {
      const playerUuid = room.getPlayerUuidBySessionUuid(sessionUuid);

      if (playerUuid) {
        dispatchUpdate(room, playerUuid);
      }
    }
  }
};
