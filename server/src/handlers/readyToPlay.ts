import { Room } from '../core/room';
import { Data } from '../types';

const pickActivePlayer = (room: Room) => {
  const playersNumber = room.getPlayersUuid().length;
  const firstPlayerUuid = room.getPlayersUuid()[Math.floor(Math.random() * playersNumber)];

  room.activePlayer = firstPlayerUuid;
};

const handleReadyToPlay = (room: Room, { player: { uuid } }: Data): void => {
  const player = room.getPlayerByUuid(uuid);

  if (!room.activePlayer) {
    pickActivePlayer(room);
  }

  player.send({ type: 'SET_ACTIVE_PLAYER', data: { uuid: room.activePlayer } });
  player.send({ type: 'SET_PLAYER_HAND', data: { hand: player.hand } });
  player.send({ type: 'SET_INITIAL_SCORES', data: { playersScore: room.getFormattedPlayers() } });

  // if the player reconnects, we need to sync thrown cards
  if (room.thrownCards.length > 0) {
    player.send({ type: 'SET_THROWN_CARDS', data: { thrownCards: room.getSortedThrownCards() } });
  }
};

export default handleReadyToPlay;
