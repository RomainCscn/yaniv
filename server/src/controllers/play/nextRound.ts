import { Room, User } from '../../types';
import { assignHandToPlayer, getFormattedPlayers, resetRoom } from '../../core/room';

export const handleNextRound = (room: Room): void => {
  if (room.roundWinner) {
    resetRoom(room);

    Object.entries(room.users).forEach(([, user]: [string, User]) => {
      assignHandToPlayer(room, user);
      user.ws.send(JSON.stringify({ type: 'NEW_ROUND' }));
      user.ws.send(
        JSON.stringify({ type: 'SET_OTHER_PLAYERS_CARDS', players: getFormattedPlayers(room) }),
      );
      user.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: room.activePlayer }));
      user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
    });
  }
};
