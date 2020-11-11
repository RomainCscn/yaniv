import { assignHandToPlayer, getFormattedPlayers } from '../core/room';
import rooms from '../core/rooms';
import { User } from '../types';

const handleStart = (roomId: string): void => {
  const room = rooms[roomId];

  Object.entries(room.users).forEach(([, user]: [string, User]) => {
    assignHandToPlayer(room, user);
  });

  Object.entries(room.users).forEach(([uuid, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'START_GAME', players: getFormattedPlayers(room), uuid }));
  });
};

export default handleStart;
