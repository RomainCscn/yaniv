import * as WebSocket from 'ws';

import rooms from './rooms';
import logger from '../logger';
import { findRoom } from '../utils';

export const handleWebSocketClosed = (sessionUuid: string): void => {
  const room = findRoom(sessionUuid);

  if (room) {
    const wsState = new Set(Object.entries(room.players).map(([, player]) => player.ws.readyState));

    if (wsState.size === 1 && wsState.has(WebSocket.CLOSED)) {
      delete rooms[room.roomId];

      logger.info({ roomId: room.roomId }, 'Room deleted');
    } else {
      const playerUuid = room.getPlayerUuidBySessionUuid(sessionUuid);

      if (playerUuid) {
        logger.info({ roomId: room.roomId, playerUuid }, 'Player quit an ongoing game');

        room.dispatch({ type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } });
      }
    }
  }
};
