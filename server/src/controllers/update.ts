import { sendPlayersUpdate } from '../core/dispatcher';
import { sortHand } from '../core/game/cards';
import { Room } from '../core/room';
import { SortOrder, SortType, Player } from '../types';

const handleUpdate = (
  room: Room,
  { avatar, username, uuid }: Player,
  sort?: {
    order: SortOrder;
    type: SortType;
  },
): void => {
  const { hand, ws } = room.getPlayerByUuid(uuid);

  if (sort) {
    room.updatePlayer(uuid, { sort });

    ws.send(JSON.stringify({ type: 'PLAYER_UPDATE', sort }));
    ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: sortHand(hand, sort) }));

    return;
  }

  room.updatePlayer(uuid, { avatar, username });
  sendPlayersUpdate(room);
};

export default handleUpdate;
