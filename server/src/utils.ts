import rooms from './core/rooms';
import { Room } from './core/room';

export const findRoom = (sessionUuid: string): Room | null => {
  for (const [, room] of Object.entries(rooms)) {
    if (Object.values(room.players).find((player) => player.sessionUuid === sessionUuid)) {
      return room;
    }
  }

  return null;
};
