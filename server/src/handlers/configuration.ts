import { Room } from '../core/room';
import { Data } from '../types';

const handleConfiguration = (room: Room, { configuration }: Data): void => {
  room.configuration = configuration;

  room.dispatch({ type: 'CONFIGURATION_UPDATE', data: { configuration: room.configuration } });
};

export default handleConfiguration;
