import { Room } from '../../core/room';

export const handleNextRound = (room: Room): void => {
  if (room.roundWinner) {
    room.reset();

    // first assign a hand to each player
    Object.values(room.players).forEach((player) => room.assignHandToPlayer(player));

    // then dispatch the messages
    Object.values(room.players).forEach((player) => {
      player.ws.send(JSON.stringify({ type: 'NEW_ROUND' }));
      player.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: room.activePlayer }));
      player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand }));
      player.ws.send(
        JSON.stringify({ type: 'PLAYERS_UPDATE', players: room.getFormattedPlayers() }),
      );
    });
  }
};
