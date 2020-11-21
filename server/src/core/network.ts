import * as WebSocket from 'ws';

import { sendPlayersUpdate } from './dispatcher';
import { findRoom, getPlayerUuidBySessionUuid } from './room';
import rooms from './rooms';
import logger from '../logger';

export const handleWebSocketClosed = (sessionUuid: string): void => {
  const [roomId, room] = findRoom(sessionUuid);

  if (roomId && room) {
    const wsState = new Set(Object.entries(room.players).map(([, player]) => player.ws.readyState));

    if (wsState.size === 1 && wsState.has(WebSocket.CLOSED)) {
      logger.info({ roomId }, 'Room deleted');
      delete rooms[roomId];
    } else {
      const playerUuid = getPlayerUuidBySessionUuid(room, sessionUuid);

      if (playerUuid) {
        logger.info({ roomId, playerUuid }, 'Player quit an ongoing game');
        sendPlayersUpdate(room);
      }
    }
  }
};
