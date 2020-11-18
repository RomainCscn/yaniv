import * as WebSocket from 'ws';

import { sendPlayersUpdate } from './dispatcher';
import { findRoom, getPlayerUuidBySessionUuid } from './room';
import rooms from './rooms';

export const handleWebSocketClosed = (sessionUuid: string): void => {
  const [roomId, room] = findRoom(sessionUuid);

  if (roomId && room) {
    const wsState = new Set(Object.entries(room.users).map(([, user]) => user.ws.readyState));

    if (wsState.size === 1 && wsState.has(WebSocket.CLOSED)) {
      delete rooms[roomId];
    } else {
      const userUuid = getPlayerUuidBySessionUuid(room, sessionUuid);
      if (userUuid) {
        delete room.users[userUuid];
        sendPlayersUpdate(room);
      }
    }
  }
};
