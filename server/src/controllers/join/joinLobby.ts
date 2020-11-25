import { v4 as uuidv4 } from 'uuid';

import { Player } from '../../core/player';
import { Room } from '../../core/room';
import { CustomWebSocket, InitialPlayer } from '../../types';

const isExistingPlayer = (room: Room, player: InitialPlayer) =>
  player && typeof room.players[player.uuid] === 'object';

const handleGameStarted = (
  room: Room,
  { sessionUuid, uuid, ws }: Pick<Player, 'sessionUuid' | 'uuid' | 'ws'>,
) => {
  // re-establish ws connection
  room.updatePlayer(uuid, { sessionUuid, ws });
  room
    .getPlayerByUuid(uuid)
    .send({ type: 'JOIN_ONGOING_GAME', data: { players: room.getFormattedPlayers() } });

  room.dispatch({ type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } });
};

export const handleJoinLobby = (
  room: Room,
  player: InitialPlayer,
  sessionUuid: string,
  ws: CustomWebSocket,
): void => {
  if (room.getPlayers().length > 6) {
    return ws.send(JSON.stringify({ error: 'TOO_MANY_PLAYERS' }));
  }

  if (room.activePlayer) {
    if (isExistingPlayer(room, player)) {
      return handleGameStarted(room, { sessionUuid, uuid: player.uuid, ws });
    }

    return ws.send(JSON.stringify({ error: 'GAME_ALREADY_STARTED' }));
  }

  if (isExistingPlayer(room, player)) {
    // re-establish ws connection
    room.updatePlayer(player.uuid, { sessionUuid, ws });
  } else {
    const playerUuid = uuidv4();

    room.addPlayer({ ...player, sessionUuid, uuid: playerUuid }, ws);
    room.getPlayerByUuid(playerUuid).send({ type: 'ASSIGN_UUID', data: { playerUuid } });
  }

  room.dispatch({ type: 'CONFIGURATION_UPDATE', data: { configuration: room.configuration } });
  room.dispatch({ type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } });
};
