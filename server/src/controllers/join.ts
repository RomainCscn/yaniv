import { v4 as uuidv4 } from 'uuid';

import { sendBackToLobby, sendConfiguration, sendPlayersUpdate } from '../core/dispatcher';
import { Room } from '../core/room';
import { CustomWebSocket, Player } from '../types';

const isExistingPlayer = (room: Room, player: Player) =>
  player && typeof room.players[player.uuid] === 'object';

const handleActiveExistingPlayer = (
  room: Room,
  playerUuid: string,
  sessionUuid: string,
  ws: CustomWebSocket,
) => {
  // re-establish ws connection
  room.updatePlayer(playerUuid, { sessionUuid, ws });

  ws.send(
    JSON.stringify({
      type: 'JOIN_ONGOING_GAME',
      players: room.getFormattedPlayers(),
    }),
  );

  sendPlayersUpdate(room);
};

const handleJoin = (
  actionType: string,
  room: Room,
  player: Player,
  sessionUuid: string,
  ws: CustomWebSocket,
): void => {
  if (actionType === 'JOINED_LOBBY') {
    if (Object.keys(room.players).length > 6) {
      return ws.send(JSON.stringify({ error: 'TOO_MANY_PLAYERS' }));
    }

    if (room.activePlayer) {
      if (isExistingPlayer(room, player)) {
        return handleActiveExistingPlayer(room, player.uuid, sessionUuid, ws);
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

    sendConfiguration(room);
    sendPlayersUpdate(room);
  } else if (actionType === 'BACK') {
    room.reset({ resetActivePlayer: true, resetScore: true });

    sendBackToLobby(room);
    sendPlayersUpdate(room);
  }
};

export default handleJoin;
