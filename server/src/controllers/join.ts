import * as WebSocket from 'ws';

import initRoom, { addUser } from '../room';
import rooms from '../rooms';
import { User } from '../types';

const isExistingUser = (roomName: string, userUuid: string) =>
  typeof rooms[roomName].users[userUuid] === 'object';

const handleJoin = (
  actionType: string,
  roomName: string,
  username: string,
  userUuid: string,
  ws: WebSocket,
): void => {
  if (actionType === 'REQUEST_WAITING_ROOM') {
    if (!rooms[roomName]) {
      rooms[roomName] = initRoom();
    }

    if (Object.entries(rooms[roomName].users).length > 7) {
      return ws.send(JSON.stringify({ error: 'TOO_MANY_PLAYERS' }));
    }

    if (rooms[roomName].activePlayer) {
      return ws.send(JSON.stringify({ error: 'GAME_ALREADY_STARTED' }));
    }

    if (!isExistingUser(roomName, userUuid)) {
      addUser(userUuid, rooms[roomName], username, ws);
    }

    ws.send(JSON.stringify({ type: 'PLAYER_JOINED' }));
  } else if (actionType === 'JOINED_WAITING_ROOM') {
    const usernames = Object.entries(rooms[roomName].users).map(([, user]) => user.username);

    Object.entries(rooms[roomName].users).forEach(([, user]: [string, User]) => {
      user.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', usernameList: usernames }));
    });
  } else if (actionType === 'REQUEST_PLAYING_ROOM') {
    console.log('PLAY');
  }
};

export default handleJoin;
