import { sendPlayersUpdate } from '../core/dispatcher';
import { sortHand } from '../core/game';
import { getPlayerByUuid } from '../core/room';
import rooms from '../core/rooms';
import { SortOrder, User } from '../types';

const handleUpdate = (roomId: string, player: User, sortOrder?: SortOrder): void => {
  const room = rooms[roomId];
  const user = getPlayerByUuid(room, player.uuid);

  if (sortOrder) {
    user.sortOrder = sortOrder;

    user.ws.send(JSON.stringify({ type: 'PLAYER_UPDATE', sortOrder }));
    user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: sortHand(user.hand, sortOrder) }));

    return;
  }

  user.avatar = player.avatar;
  user.username = player.username;

  sendPlayersUpdate(room);
};

export default handleUpdate;
