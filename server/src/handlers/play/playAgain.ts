import { Room } from '../../core/room';

export const handlePlayAgain = (room: Room): void => {
  room.reset({ resetScore: true });

  room.getPlayers().forEach((player) => {
    room.assignHandToPlayer(player);
    player.send({ type: 'SET_PLAYER_HAND', data: { hand: player.hand } });
  });

  room.dispatchMultiple([
    { type: 'NEW_ROUND' },
    { type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } },
    { type: 'SET_ACTIVE_PLAYER', data: { uuid: room.activePlayer } },
    { type: 'SET_INITIAL_SCORES', data: { playersScore: room.getFormattedPlayers() } },
  ]);
};
