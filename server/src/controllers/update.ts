import { sendPlayersUpdate } from '../core/dispatcher';
import { getPlayerByUuid } from '../core/room';
import rooms from '../core/rooms';

interface UserInformation {
  avatar: string;
  username: string;
}

const handleUpdate = (
  roomId: string,
  userUuid: string,
  { avatar, username }: UserInformation,
): void => {
  const room = rooms[roomId];
  const user = getPlayerByUuid(room, userUuid);

  user.avatarId = avatar;
  user.username = username;

  sendPlayersUpdate(room);
};

export default handleUpdate;
