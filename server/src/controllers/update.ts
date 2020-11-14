import { sendPlayersUpdate } from '../core/dispatcher';
import { sortHand } from '../core/game';
import { getPlayerByUuid } from '../core/room';
import rooms from '../core/rooms';
import { SortOrder } from '../types';

interface UserInformation {
  avatar: string;
  sortOrder?: SortOrder;
  username: string;
}

const handleUpdate = (
  roomId: string,
  userUuid: string,
  { avatar, sortOrder, username }: UserInformation,
): void => {
  const room = rooms[roomId];
  const user = getPlayerByUuid(room, userUuid);

  if (sortOrder) {
    user.sortOrder = sortOrder;

    user.ws.send(JSON.stringify({ type: 'PLAYER_UPDATE', sortOrder }));
    user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: sortHand(user.hand, sortOrder) }));

    return;
  }

  user.avatarId = avatar;
  user.username = username;

  sendPlayersUpdate(room);
};

export default handleUpdate;
