import * as WebSocket from 'ws';

import { Room } from './types';

const rooms: Record<string, Room> = {};

const findRoom = (userUuid: string): [string, Room] | [] => {
  for (const [roomId, room] of Object.entries(rooms)) {
    if (room.users[userUuid]) {
      return [roomId, room];
    }
  }

  return [];
};

export const handleWebSocketClosed = (userUuid: string): void => {
  const [roomId, room] = findRoom(userUuid);

  if (roomId && room) {
    const wsState = new Set(Object.entries(room?.users).map(([, user]) => user.ws.readyState));

    if (wsState.size === 1 && wsState.has(WebSocket.CLOSED)) {
      delete rooms[roomId];
    }
  }
};

export default rooms;
