import rooms from '../rooms';
import { User } from '../types';

const handleReadyToPlay = (roomName: string): void => {
  if (!rooms[roomName].activePlayer) {
    const playersNumber = Object.entries(rooms[roomName].users).length;
    const firstPlayerUuid = Object.entries(rooms[roomName].users)[
      Math.floor(Math.random() * playersNumber)
    ][0];

    rooms[roomName].activePlayer = firstPlayerUuid;
  }

  Object.entries(rooms[roomName].users).forEach(([, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: rooms[roomName].activePlayer }));
    user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
  });
};

export default handleReadyToPlay;
