import { handleDropAndPick } from './dropAndPick';
import { handleEndRound } from './endRound';
import { handleNextRound } from './nextRound';
import { handlePlayAgain } from './playAgain';
import { handleQuickPlay } from './quickPlay';

import rooms from '../../core/rooms';
import { PlayedCards } from '../../types';

const getPlayerByUuid = (roomId: string, userUuid: string) => rooms[roomId].users[userUuid];

const handlePlay = (
  actionType: string,
  cards: PlayedCards,
  roomId: string,
  userUuid: string,
): void => {
  const room = rooms[roomId];
  const user = getPlayerByUuid(roomId, userUuid);

  if (actionType === 'DROP_AND_PICK') {
    handleDropAndPick(room, user, cards);
  } else if (actionType === 'QUICK_PLAY') {
    handleQuickPlay(room, user, cards);
  } else if (actionType === 'YANIV') {
    handleEndRound(room, userUuid);
  } else if (actionType === 'NEXT_ROUND') {
    handleNextRound(room);
  } else if (actionType === 'PLAY_AGAIN') {
    handlePlayAgain(room);
  }
};

export default handlePlay;
