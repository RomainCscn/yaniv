import * as WebSocket from 'ws';

import { sendPlayersUpdate } from './dispatcher';
import { findRoom } from './room';
import rooms from './rooms';

export const handleWebSocketClosed = (userUuid: string): void => {
  const [roomId, room] = findRoom(userUuid);

  if (roomId && room) {
    const wsState = new Set(Object.entries(room.users).map(([, user]) => user.ws.readyState));

    if (wsState.size === 1 && wsState.has(WebSocket.CLOSED)) {
      delete rooms[roomId];
    } else {
      delete room.users[userUuid];
      sendPlayersUpdate(room);
    }
  }
};
