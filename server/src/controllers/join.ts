import * as WebSocket from 'ws';

import initRoom, { addUser } from '../room';
import rooms from '../rooms';
import { User } from '../types';

const isExistingUser = (roomName: string, userUuid: string) =>
  typeof rooms[roomName].users[userUuid] === 'object';

const handleJoin = (roomName: string, username: string, userUuid: string, ws: WebSocket): void => {
  if (!rooms[roomName]) {
    rooms[roomName] = initRoom();
  }

  if (Object.entries(rooms[roomName].users).length > 7) {
    console.error('No more than 7 players');
  }

  if (!isExistingUser(roomName, userUuid)) {
    addUser(userUuid, rooms[roomName], username, ws);

    const usernames = Object.entries(rooms[roomName].users).map(([, user]) => user.username);

    Object.entries(rooms[roomName].users).forEach(([, user]: [string, User]) => {
      user.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', usernameList: usernames }));
    });
  }
};

export default handleJoin;
