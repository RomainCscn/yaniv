import { handleDropAndPick } from './dropAndPick';
import { handleEndRound } from './endRound';
import { handleNextRound } from './nextRound';
import { handlePlayAgain } from './playAgain';
import { handleQuickPlay } from './quickPlay';

import { Room } from '../../core/room';
import { PlayedCards } from '../../types';

const handlePlay = (
  actionType: string,
  room: Room,
  cards: PlayedCards,
  playerUuid: string,
): void => {
  const player = room.getPlayerByUuid(playerUuid);

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
