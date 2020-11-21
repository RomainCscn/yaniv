import { sendStartGame } from '../core/dispatcher';
import { assignHandToPlayer } from '../core/room';
import rooms from '../core/rooms';
import { Player } from '../types';

const handleStart = (roomId: string): void => {
  const room = rooms[roomId];

  Object.values(room.players).forEach((player: Player) => assignHandToPlayer(room, player));

  // remove players with WebSocket closed
  room.players = Object.fromEntries(
    Object.entries(room.players).filter(([, player]) => player.ws.readyState !== player.ws.CLOSED),
  );

  sendStartGame(room);
};

export default handleStart;
