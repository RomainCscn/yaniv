import { Room } from '../../core/room';

export const handleBackToLobby = (room: Room): void => {
  room.reset({ resetActivePlayer: true, resetScore: true });

  room.dispatch({ type: 'BACK_TO_LOBBY' });
  room.dispatch({ type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } });
};
