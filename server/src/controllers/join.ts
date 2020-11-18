import { v4 as uuidv4 } from 'uuid';

import { sendConfiguration, sendPlayersUpdate } from '../core/dispatcher';
import initRoom, { addUser, getPlayerByUuid, getFormattedPlayers, resetRoom } from '../core/room';
import rooms from '../core/rooms';
import { CustomWebSocket, User } from '../types';

const isExistingUser = (roomId: string, player: User) =>
  player && typeof rooms[roomId].users[player.uuid] === 'object';

const handleJoin = (
  actionType: string,
  roomId: string,
  player: User,
  sessionUuid: string,
  ws: CustomWebSocket,
): void => {
  if (actionType === 'JOINED_LOBBY') {
    if (!rooms[roomId]) {
      rooms[roomId] = initRoom();
    }

    if (Object.entries(rooms[roomId].users).length > 6) {
      return ws.send(JSON.stringify({ error: 'TOO_MANY_PLAYERS' }));
    }

    if (rooms[roomId].activePlayer) {
      if (isExistingUser(roomId, player)) {
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

    if (isExistingUser(roomId, player)) {
      // re-establish ws connection
      getPlayerByUuid(rooms[roomId], player.uuid).sessionUuid = sessionUuid;
      getPlayerByUuid(rooms[roomId], player.uuid).ws = ws;
    } else {
      const playerUuid = uuidv4();

      addUser(playerUuid, rooms[roomId], { ...player, sessionUuid }, ws);
      ws.send(JSON.stringify({ type: 'ASSIGN_UUID', playerUuid }));
    }

    sendConfiguration(rooms[roomId]);
    sendPlayersUpdate(rooms[roomId]);
  } else if (actionType === 'BACK') {
    resetRoom(rooms[roomId], { resetActivePlayer: true });
    sendPlayersUpdate(rooms[roomId]);
  }
};

export default handleJoin;
