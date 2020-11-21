import { v4 as uuidv4 } from 'uuid';

import { sendBackToLobby, sendConfiguration, sendPlayersUpdate } from '../core/dispatcher';
import initRoom, { addPlayer, getFormattedPlayers, resetRoom, updatePlayer } from '../core/room';
import rooms from '../core/rooms';
import { CustomWebSocket, Player, Room } from '../types';

const isExistingPlayer = (roomId: string, player: Player) =>
  player && typeof rooms[roomId].players[player.uuid] === 'object';

const handleActiveExistingPlayer = (
  room: Room,
  playerUuid: string,
  sessionUuid: string,
  ws: CustomWebSocket,
) => {
  // re-establish ws connection
  updatePlayer(room, playerUuid, { sessionUuid, ws });

  ws.send(
    JSON.stringify({
      type: 'JOIN_ONGOING_GAME',
      players: getFormattedPlayers(room),
    }),
  );

  sendPlayersUpdate(room);
};

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
        return handleActiveExistingPlayer(rooms[roomId], player.uuid, sessionUuid, ws);
      }

      return ws.send(JSON.stringify({ error: 'GAME_ALREADY_STARTED' }));
    }

    if (isExistingPlayer(roomId, player)) {
      // re-establish ws connection
      updatePlayer(rooms[roomId], player.uuid, { sessionUuid, ws });
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
