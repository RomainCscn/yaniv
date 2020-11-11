import rooms from '../core/rooms';
import { User } from '../types';

const handleReadyToPlay = (roomId: string): void => {
  if (!rooms[roomId].activePlayer) {
    const playersNumber = Object.entries(rooms[roomId].users).length;
    const firstPlayerUuid = Object.entries(rooms[roomId].users)[
      Math.floor(Math.random() * playersNumber)
    ][0];

    rooms[roomId].activePlayer = firstPlayerUuid;
  }

  Object.entries(rooms[roomId].users).forEach(([, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: rooms[roomId].activePlayer }));
    user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
  });
};

export default handleReadyToPlay;
