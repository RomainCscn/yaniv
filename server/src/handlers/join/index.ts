import { Room } from '../../core/room';
import { Data } from '../../types';
import { handleBackToLobby } from './backToLobby';
import { handleJoinLobby } from './joinLobby';

const handleJoin = (room: Room, { actionType, player, sessionUuid, ws }: Data): void => {
  if (actionType === 'BACK') {
    handleBackToLobby(room);
  } else {
    handleJoinLobby(room, player, sessionUuid, ws);
  }
};

export default handleJoin;
