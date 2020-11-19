import { sendStartGame } from '../core/dispatcher';
import { assignHandToPlayer } from '../core/room';
import rooms from '../core/rooms';
import { User } from '../types';

const handleStart = (roomId: string): void => {
  const room = rooms[roomId];

  Object.entries(room.users).forEach(([, user]: [string, User]) => {
    assignHandToPlayer(room, user);
  });

  // remove users with WebSocket closed
  room.users = Object.fromEntries(
    Object.entries(room.users).filter(([, user]) => user.ws.readyState !== user.ws.CLOSED),
  );

  sendStartGame(room);
};

export default handleStart;
