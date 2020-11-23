import { Room } from '../../core/room';

export const handlePlayAgain = (room: Room): void => {
  room.reset({ resetScore: true });

  Object.values(room.players).forEach((player) => {
    room.assignHandToPlayer(player);

    player.ws.send(JSON.stringify({ type: 'NEW_ROUND' }));
    player.ws.send(
      JSON.stringify({ type: 'SET_INTIAL_SCORES', playersScore: room.getPlayersScore() }),
    );
    player.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', players: room.getFormattedPlayers() }));
    player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand }));
    player.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: room.activePlayer }));
  });
};
