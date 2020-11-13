import { sendPlayersUpdate } from '../core/dispatcher';
import initRoom, { addUser } from '../core/room';
import rooms from '../core/rooms';
import { CustomWebSocket } from '../types';

const isExistingUser = (roomId: string, userUuid: string) =>
  typeof rooms[roomId].users[userUuid] === 'object';

const handleJoin = (
  actionType: string,
  avatar: string,
  roomId: string,
  username: string,
  userUuid: string,
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
      return ws.send(JSON.stringify({ error: 'GAME_ALREADY_STARTED' }));
    }

    if (!isExistingUser(roomId, userUuid)) {
      addUser(userUuid, rooms[roomId], { avatar, username }, ws);
    }

    ws.send(JSON.stringify({ type: 'PLAYER_JOINED' }));

    sendPlayersUpdate(rooms[roomId]);
  }
};

export default handleJoin;
