import { getPlayerByUuid, getPlayersScore, getSortedCards } from '../core/room';
import rooms from '../core/rooms';

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

  // if the user reconnect, we need to sync thrown cards
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
