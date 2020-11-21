import { sendPlayersUpdate } from '../core/dispatcher';
import { sortHand } from '../core/game';
import { getPlayerByUuid } from '../core/room';
import rooms from '../core/rooms';
import { SortOrder, SortType, Player } from '../types';

const handleUpdate = (
  roomId: string,
  player: Player,
  sort?: {
    order: SortOrder;
    type: SortType;
  },
): void => {
  const room = rooms[roomId];
  const currentPlayer = getPlayerByUuid(room, player.uuid);

  if (sort) {
    currentPlayer.sort = sort;

    currentPlayer.ws.send(JSON.stringify({ type: 'PLAYER_UPDATE', sort }));
    currentPlayer.ws.send(
      JSON.stringify({ type: 'SET_PLAYER_HAND', hand: sortHand(currentPlayer.hand, sort) }),
    );

    return;
  }

  currentPlayer.avatar = player.avatar;
  currentPlayer.username = player.username;

  sendPlayersUpdate(room);
};

export default handleUpdate;
