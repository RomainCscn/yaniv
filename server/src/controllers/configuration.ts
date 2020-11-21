import { sendConfiguration } from '../core/dispatcher';
import rooms from '../core/rooms';
import { RoomConfiguration } from '../types';

const handleConfiguration = (roomId: string, configuration: RoomConfiguration): void => {
  rooms[roomId].configuration = configuration;

  sendConfiguration(rooms[roomId]);
};

export default handleConfiguration;
