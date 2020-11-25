import { Room } from '../core/room';

const pickActivePlayer = (room: Room) => {
  const playersNumber = room.getPlayersUuid().length;
  const firstPlayerUuid = room.getPlayersUuid()[Math.floor(Math.random() * playersNumber)];

  room.activePlayer = firstPlayerUuid;
};

const handleReadyToPlay = (room: Room, playerUuid: string): void => {
  const player = room.getPlayerByUuid(playerUuid);

  if (!room.activePlayer) {
    pickActivePlayer(room);
  }

  const playersScore = room.getPlayersScore();

  player.send({ type: 'SET_ACTIVE_PLAYER', data: { uuid: room.activePlayer } });
  player.send({ type: 'SET_PLAYER_HAND', data: { hand: player.hand } });
  player.send({ type: 'SET_INITIAL_SCORES', data: { playersScore } });

  // if the player reconnects, we need to sync thrown cards
  if (room.thrownCards.length > 0) {
    player.send({ type: 'SET_THROWN_CARDS', data: { thrownCards: room.getSortedThrownCards() } });
  }
};

export default handleReadyToPlay;
