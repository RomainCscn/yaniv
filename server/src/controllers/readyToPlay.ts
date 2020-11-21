import { getPlayerByUuid, getPlayersScore, getSortedCards } from '../core/room';
import rooms from '../core/rooms';
import { Room } from '../types';

const pickActivePlayer = (room: Room) => {
  const playersNumber = Object.keys(room.players).length;
  const firstPlayerUuid = Object.keys(room.players)[Math.floor(Math.random() * playersNumber)];

  room.activePlayer = firstPlayerUuid;
};

const handleReadyToPlay = (roomId: string, playerUuid: string): void => {
  const player = getPlayerByUuid(rooms[roomId], playerUuid);

  if (!rooms[roomId].activePlayer) {
    pickActivePlayer(rooms[roomId]);
  }

  const playersScore = getPlayersScore(rooms[roomId]);

  player.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: rooms[roomId].activePlayer }));
  player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand }));
  player.ws.send(JSON.stringify({ type: 'SET_INTIAL_SCORES', playersScore }));

  // if the player reconnects, we need to sync thrown cards
  if (rooms[roomId].thrownCards.length > 0) {
    player.ws.send(
      JSON.stringify({
        type: 'SET_THROWN_CARDS',
        thrownCards: getSortedCards(rooms[roomId].thrownCards),
      }),
    );
  }
};

export default handleReadyToPlay;
