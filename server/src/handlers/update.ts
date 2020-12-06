import { sortHand } from '../core/cards';
import { Room } from '../core/room';
import { Data } from '../types';

const handleUpdate = (room: Room, { player: { avatar, username, uuid }, sort }: Data): void => {
  const updateSort = () => {
    const player = room.getPlayerByUuid(uuid);

    room.updatePlayer(uuid, { sort });
    player.send({ type: 'PLAYER_UPDATE', data: { sort } });
    player.send({ type: 'SET_PLAYER_HAND', data: { hand: sortHand(player.hand, sort) } });
  };

  if (sort) {
    return updateSort();
  }

  room.updatePlayer(uuid, { avatar, username });
  room.dispatch({ type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } });
};

export default handleUpdate;
