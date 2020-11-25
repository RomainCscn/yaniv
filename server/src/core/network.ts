import * as WebSocket from 'ws';

import { Player } from './player';
import rooms from './rooms';
import logger from '../logger';
import { findRoom } from '../utils';

const getUniqueWsState = (players: Player[]) => new Set(players.map(({ ws }) => ws.readyState));

export const handleWebSocketClosed = (sessionUuid: string): void => {
  const room = findRoom(sessionUuid);

  if (room) {
    const wsState = getUniqueWsState(room.getPlayers());

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
