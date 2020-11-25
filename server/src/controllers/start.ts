import { Player } from '../core/player';
import { Room } from '../core/room';

const handleStart = (room: Room): void => {
  room.getPlayers().forEach((player: Player) => room.assignHandToPlayer(player));

  // remove players with WebSocket closed
  room.players = Object.fromEntries(
    Object.entries(room.players).filter(([, player]) => player.ws.readyState !== player.ws.CLOSED),
  );

  room.dispatch({ type: 'START_GAME', data: { players: room.getFormattedPlayers() } });
};

export default handleStart;
