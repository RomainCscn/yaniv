import { v4 as uuidv4 } from 'uuid';

import { Player } from '../../core/player';
import { Room } from '../../core/room';
import { CustomWebSocket, InitialPlayer } from '../../types';

const isExistingPlayer = (room: Room, player: InitialPlayer) =>
  player && typeof room.players[player.uuid] === 'object';

const handleGameStarted = (room: Room, { sessionUuid, uuid, ws }: Player) => {
  // re-establish ws connection
  room.updatePlayer(uuid, { sessionUuid, ws });
  ws.send(JSON.stringify({ type: 'JOIN_ONGOING_GAME', players: room.getFormattedPlayers() }));

  room.dispatch({ type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } });
};

export const handleJoinLobby = (
  room: Room,
  player: InitialPlayer,
  sessionUuid: string,
  ws: CustomWebSocket,
): void => {
  if (Object.keys(room.players).length > 6) {
    return ws.send(JSON.stringify({ error: 'TOO_MANY_PLAYERS' }));
  }

  if (room.activePlayer) {
    if (isExistingPlayer(room, player)) {
      return handleGameStarted(room, room.getPlayerByUuid(player.uuid));
    }

    return ws.send(JSON.stringify({ error: 'GAME_ALREADY_STARTED' }));
  }

  if (isExistingPlayer(room, player)) {
    // re-establish ws connection
    room.updatePlayer(player.uuid, { sessionUuid, ws });
  } else {
    const playerUuid = uuidv4();

    room.addPlayer({ ...player, sessionUuid, uuid: playerUuid }, ws);
    ws.send(JSON.stringify({ type: 'ASSIGN_UUID', playerUuid }));
  }

  room.dispatch({ type: 'CONFIGURATION_UPDATE', data: { configuration: room.configuration } });
  room.dispatch({ type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } });
};
