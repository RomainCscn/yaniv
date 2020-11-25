import { Room } from '../core/room';
import { RoomConfiguration } from '../types';

const handleConfiguration = (room: Room, configuration: RoomConfiguration): void => {
  room.configuration = configuration;

  room.dispatch({ type: 'CONFIGURATION_UPDATE', data: { configuration: room.configuration } });
};

export default handleConfiguration;
