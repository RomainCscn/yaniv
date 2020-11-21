import { sendPlayersUpdate } from '../core/dispatcher';
import { sortHand } from '../core/game';
import { getPlayerByUuid, updatePlayer } from '../core/room';
import rooms from '../core/rooms';
import { SortOrder, SortType, Player } from '../types';

const handleUpdate = (
  roomId: string,
  { avatar, username, uuid }: Player,
  sort?: {
    order: SortOrder;
    type: SortType;
  },
): void => {
  const room = rooms[roomId];
  const { hand, ws } = getPlayerByUuid(room, uuid);

  if (sort) {
    updatePlayer(room, uuid, { sort });

    ws.send(JSON.stringify({ type: 'PLAYER_UPDATE', sort }));
    ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: sortHand(hand, sort) }));

    return;
  }

  updatePlayer(room, uuid, { avatar, username });
  sendPlayersUpdate(room);
};

export default handleUpdate;
