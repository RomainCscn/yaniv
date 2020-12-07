import { Player } from '../core/player';
import { Room } from '../core/room';

const handleStart = (room: Room): void => {
  room.getPlayers().forEach((player: Player) => room.assignHandToPlayer(player));
  room.players = room.getActivePlayers();

  room.dispatch({ type: 'START_GAME' });
};

export default handleStart;
