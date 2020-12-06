import { handleDropAndPick } from './dropAndPick';
import { handleEndRound } from './endRound';
import { handleNextRound } from './nextRound';
import { handlePlayAgain } from './playAgain';
import { handleQuickPlay } from './quickPlay';

import { Room } from '../../core/room';
import { Data } from '../../types';

const handlePlay = (room: Room, { actionType, cards, player: { uuid } }: Data): void => {
  const player = room.getPlayerByUuid(uuid);

  if (actionType === 'DROP_AND_PICK') {
    handleDropAndPick(room, player, cards);
  } else if (actionType === 'QUICK_PLAY') {
    handleQuickPlay(room, player, cards);
  } else if (actionType === 'YANIV') {
    handleEndRound(room, uuid);
  } else if (actionType === 'NEXT_ROUND') {
    handleNextRound(room);
  } else if (actionType === 'PLAY_AGAIN') {
    handlePlayAgain(room);
  }
};

export default handlePlay;
