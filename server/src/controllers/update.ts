import { getCurrentUser, getPlayers } from '../room';
import { User } from '../types';
import rooms from '../rooms';

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
  const user = getCurrentUser(room, userUuid);

  user.avatarId = avatar;
  user.username = username;

  Object.entries(rooms[roomId].users).forEach(([, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', players: getPlayers(room) }));
  });
};

export default handleUpdate;
