import { sendConfiguration } from '../core/dispatcher';
import rooms from '../core/rooms';
import { RoomConfiguration } from '../types';

const handleConfiguration = (roomId: string, configuration: RoomConfiguration): void => {
  const room = rooms[roomId];

  room.configuration = configuration;

  sendConfiguration(room);
};

export default handleConfiguration;
