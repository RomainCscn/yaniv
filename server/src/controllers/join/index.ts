import { Player } from '../../core/player';
import { Room } from '../../core/room';
import { CustomWebSocket } from '../../types';
import { handleBackToLobby } from './backToLobby';
import { handleJoinLobby } from './joinLobby';

const handleJoin = (
  actionType: string,
  room: Room,
  player: Player,
  sessionUuid: string,
  ws: CustomWebSocket,
): void => {
  if (actionType === 'JOINED_LOBBY') {
    handleJoinLobby(room, player, sessionUuid, ws);
  } else if (actionType === 'BACK') {
    handleBackToLobby(room);
  }
};

export default handleJoin;
