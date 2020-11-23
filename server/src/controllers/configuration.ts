import { sendConfiguration } from '../core/dispatcher';
import { Room } from '../core/room';
import { RoomConfiguration } from '../types';

const handleConfiguration = (room: Room, configuration: RoomConfiguration): void => {
  room.configuration = configuration;

  sendConfiguration(room);
};

export default handleConfiguration;
