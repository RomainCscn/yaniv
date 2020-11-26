import { Room } from '../../core/room';
import { ActionType, CustomWebSocket, InitialPlayer } from '../../types';
import { handleBackToLobby } from './backToLobby';
import { handleJoinLobby } from './joinLobby';

const handleJoin = (
  actionType: ActionType,
  room: Room,
  player: InitialPlayer,
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
