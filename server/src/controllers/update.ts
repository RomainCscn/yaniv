import { sendPlayersUpdate } from '../core/dispatcher';
import { sortHand } from '../core/game';
import { getPlayerByUuid } from '../core/room';
import rooms from '../core/rooms';
import { SortOrder, Player } from '../types';

const handleUpdate = (roomId: string, player: Player, sortOrder?: SortOrder): void => {
  const room = rooms[roomId];
  const currentPlayer = getPlayerByUuid(room, player.uuid);

  if (sortOrder) {
    currentPlayer.sortOrder = sortOrder;

    currentPlayer.ws.send(JSON.stringify({ type: 'PLAYER_UPDATE', sortOrder }));
    currentPlayer.ws.send(
      JSON.stringify({ type: 'SET_PLAYER_HAND', hand: sortHand(currentPlayer.hand, sortOrder) }),
    );

    return;
  }

  currentPlayer.avatar = currentPlayer.avatar;
  currentPlayer.username = currentPlayer.username;

  sendPlayersUpdate(room);
};

export default handleUpdate;
