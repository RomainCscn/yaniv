import { sortHand } from '../core/cards';
import { Room } from '../core/room';
import { InitialPlayer, Sort } from '../types';

const handleUpdate = (room: Room, { avatar, username, uuid }: InitialPlayer, sort?: Sort): void => {
  const player = room.getPlayerByUuid(uuid);

  if (sort) {
    room.updatePlayer(uuid, { sort });
    player.send({ type: 'PLAYER_UPDATE', data: { sort } });
    player.send({ type: 'SET_PLAYER_HAND', data: { hand: sortHand(player.hand, sort) } });

    return;
  }

  room.updatePlayer(uuid, { avatar, username });
  room.dispatch({ type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } });
};

export default handleUpdate;
