import { Room, Player } from '../../types';
import { assignHandToPlayer, getFormattedPlayers, resetRoom } from '../../core/room';

export const handleNextRound = (room: Room): void => {
  if (room.roundWinner) {
    resetRoom(room);

    // first assign a hand to each player
    Object.entries(room.players).forEach(([, player]: [string, Player]) => {
      assignHandToPlayer(room, player);
    });

    // then dispatch the messages
    Object.entries(room.players).forEach(([, player]: [string, Player]) => {
      player.ws.send(JSON.stringify({ type: 'NEW_ROUND' }));
      player.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: room.activePlayer }));
      player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand }));
      player.ws.send(
        JSON.stringify({ type: 'PLAYERS_UPDATE', players: getFormattedPlayers(room) }),
      );
    });
  }
};
