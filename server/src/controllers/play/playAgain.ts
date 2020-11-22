import { Room, Player } from '../../types';
import {
  assignHandToPlayer,
  getFormattedPlayers,
  getPlayersScore,
  resetRoom,
} from '../../core/room';

export const handlePlayAgain = (room: Room): void => {
  resetRoom(room, { resetScore: true });

  Object.entries(room.players).forEach(([, player]: [string, Player]) => {
    assignHandToPlayer(room, player);

    player.ws.send(JSON.stringify({ type: 'NEW_ROUND' }));
    player.ws.send(
      JSON.stringify({ type: 'SET_INTIAL_SCORES', playersScore: getPlayersScore(room) }),
    );
    player.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', players: getFormattedPlayers(room) }));
    player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand }));
    player.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: room.activePlayer }));
  });
};
