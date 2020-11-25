import { Room } from '../../core/room';

export const handleNextRound = (room: Room): void => {
  if (room.roundWinner) {
    room.reset();

    room.getPlayers().forEach((player) => {
      room.assignHandToPlayer(player);
      player.send({ type: 'SET_PLAYER_HAND', data: { hand: player.hand } });
    });

    room.dispatchMultiple([
      { type: 'NEW_ROUND' },
      { type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } },
      { type: 'SET_ACTIVE_PLAYER', data: { uuid: room.activePlayer } },
    ]);
  }
};
