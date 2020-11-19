import { handleDropAndPick } from './dropAndPick';
import { handleEndRound } from './endRound';
import { handleNextRound } from './nextRound';
import { handlePlayAgain } from './playAgain';
import { handleQuickPlay } from './quickPlay';

import rooms from '../../core/rooms';
import { PlayedCards } from '../../types';

const getPlayerByUuid = (roomId: string, playerUuid: string) => rooms[roomId].players[playerUuid];

const handlePlay = (
  actionType: string,
  cards: PlayedCards,
  roomId: string,
  playerUuid: string,
): void => {
  const room = rooms[roomId];
  const player = getPlayerByUuid(roomId, playerUuid);

  if (actionType === 'DROP_AND_PICK') {
    handleDropAndPick(room, player, cards);
  } else if (actionType === 'QUICK_PLAY') {
    handleQuickPlay(room, player, cards);
  } else if (actionType === 'YANIV') {
    handleEndRound(room, playerUuid);
  } else if (actionType === 'NEXT_ROUND') {
    handleNextRound(room);
  } else if (actionType === 'PLAY_AGAIN') {
    handlePlayAgain(room);
  }
};

export default handlePlay;
