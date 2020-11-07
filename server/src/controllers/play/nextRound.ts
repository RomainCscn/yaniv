import { Room, User } from '../../types';
import { assignHandToUser, getPlayers, resetDeck } from '../../room';

export const handleNextRound = (room: Room): void => {
  resetDeck(room);

  Object.entries(room.users).forEach(([, user]: [string, User]) => {
    assignHandToUser(room, user);
    user.ws.send(JSON.stringify({ type: 'NEW_ROUND' }));
    user.ws.send(JSON.stringify({ type: 'SET_OTHER_PLAYERS_CARDS', players: getPlayers(room) }));
    user.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: room.activePlayer }));
    user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
  });
};
