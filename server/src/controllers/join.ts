import { v4 as uuidv4 } from 'uuid';

import { sendBackToLobby, sendConfiguration, sendPlayersUpdate } from '../core/dispatcher';
import initRoom, { addPlayer, getPlayerByUuid, getFormattedPlayers, resetRoom } from '../core/room';
import rooms from '../core/rooms';
import { CustomWebSocket, Player } from '../types';

const isExistingPlayer = (roomId: string, player: Player) =>
  player && typeof rooms[roomId].players[player.uuid] === 'object';

const handleJoin = (
  actionType: string,
  roomId: string,
  player: Player,
  sessionUuid: string,
  ws: CustomWebSocket,
): void => {
  if (actionType === 'JOINED_LOBBY') {
    if (!rooms[roomId]) {
      rooms[roomId] = initRoom();
    }

    if (Object.entries(rooms[roomId].players).length > 6) {
      return ws.send(JSON.stringify({ error: 'TOO_MANY_PLAYERS' }));
    }

    if (rooms[roomId].activePlayer) {
      if (isExistingPlayer(roomId, player)) {
        // re-establish ws connection
        getPlayerByUuid(rooms[roomId], player.uuid).sessionUuid = sessionUuid;
        getPlayerByUuid(rooms[roomId], player.uuid).ws = ws;

        ws.send(
          JSON.stringify({
            type: 'JOIN_ONGOING_GAME',
            players: getFormattedPlayers(rooms[roomId]),
          }),
        );

        return sendPlayersUpdate(rooms[roomId]);
      }

      return ws.send(JSON.stringify({ error: 'GAME_ALREADY_STARTED' }));
    }

    if (isExistingPlayer(roomId, player)) {
      // re-establish ws connection
      getPlayerByUuid(rooms[roomId], player.uuid).sessionUuid = sessionUuid;
      getPlayerByUuid(rooms[roomId], player.uuid).ws = ws;
    } else {
      const playerUuid = uuidv4();

      addPlayer(playerUuid, rooms[roomId], { ...player, sessionUuid }, ws);
      ws.send(JSON.stringify({ type: 'ASSIGN_UUID', playerUuid }));
    }

    sendConfiguration(rooms[roomId]);
    sendPlayersUpdate(rooms[roomId]);
  } else if (actionType === 'BACK') {
    resetRoom(rooms[roomId], { resetActivePlayer: true, resetScore: true });
    sendBackToLobby(rooms[roomId]);
    sendPlayersUpdate(rooms[roomId]);
  }
};

export default handleJoin;
