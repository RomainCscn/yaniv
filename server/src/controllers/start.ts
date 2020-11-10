import { assignHandToUser, getPlayers } from '../room';
import rooms from '../rooms';
import { User } from '../types';

const handleStart = (roomId: string): void => {
  const room = rooms[roomId];

  Object.entries(room.users).forEach(([, user]: [string, User]) => {
    assignHandToUser(room, user);
  });

  Object.entries(room.users).forEach(([uuid, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'START_GAME', players: getPlayers(room), uuid }));
  });
};

export default handleStart;
