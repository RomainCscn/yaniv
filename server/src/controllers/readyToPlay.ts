import { getPlayerByUuid, getPlayersScore } from '../core/room';
import rooms from '../core/rooms';
import { User } from '../types';

const handleReadyToPlay = (roomId: string, userUuid: string): void => {
  const player = getPlayerByUuid(rooms[roomId], userUuid);

  if (!rooms[roomId].activePlayer) {
    const playersNumber = Object.entries(rooms[roomId].users).length;
    const firstPlayerUuid = Object.entries(rooms[roomId].users)[
      Math.floor(Math.random() * playersNumber)
    ][0];

    rooms[roomId].activePlayer = firstPlayerUuid;
  }

  const playersScore = getPlayersScore(rooms[roomId]);

  player.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: rooms[roomId].activePlayer }));
  player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand }));
  player.ws.send(JSON.stringify({ type: 'SET_INTIAL_SCORES', playersScore }));
};

export default handleReadyToPlay;
