import rooms from './core/rooms';
import { Room } from './core/room';

export const findRoom = (sessionUuid: string): Room | null => {
  for (const [, room] of Object.entries(rooms)) {
    if (room.getPlayers().find((player) => player.sessionUuid === sessionUuid)) {
      return room;
    }
  }

  return null;
};
