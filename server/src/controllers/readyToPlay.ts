import { Room } from '../core/room';

const pickActivePlayer = (room: Room) => {
  const playersNumber = Object.keys(room.players).length;
  const firstPlayerUuid = Object.keys(room.players)[Math.floor(Math.random() * playersNumber)];

  room.activePlayer = firstPlayerUuid;
};

const handleReadyToPlay = (room: Room, playerUuid: string): void => {
  const player = room.getPlayerByUuid(playerUuid);

  if (!room.activePlayer) {
    pickActivePlayer(room);
  }

  const playersScore = room.getPlayersScore();

  player.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: room.activePlayer }));
  player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand }));
  player.ws.send(JSON.stringify({ type: 'SET_INTIAL_SCORES', playersScore }));

  // if the player reconnects, we need to sync thrown cards
  if (room.thrownCards.length > 0) {
    player.ws.send(
      JSON.stringify({
        type: 'SET_THROWN_CARDS',
        thrownCards: room.getSortedThrownCards(),
      }),
    );
  }
};

export default handleReadyToPlay;
