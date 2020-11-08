import { handleDropAndPick } from './dropAndPick';
import { handleEndRound } from './endRound';
import { handleNextRound } from './nextRound';
import { handlePlayAgain } from './playAgain';
import { handleQuickPlay } from './quickPlay';

import rooms from '../../rooms';
import { PlayedCards } from '../../types';

const getCurrentUser = (roomName: string, userUuid: string) => rooms[roomName].users[userUuid];

const handlePlay = (
  actionType: string,
  cards: PlayedCards,
  roomName: string,
  userUuid: string,
): void => {
  const room = rooms[roomName];
  const user = getCurrentUser(roomName, userUuid);

  if (actionType === 'DROP_AND_PICK') {
    handleDropAndPick(room, user, cards);
  } else if (actionType === 'QUICK_PLAY') {
    handleQuickPlay(room, user, cards);
  } else if (actionType === 'MAMIXTA') {
    handleEndRound(room, userUuid);
  } else if (actionType === 'NEXT_ROUND') {
    handleNextRound(room);
  } else if (actionType === 'PLAY_AGAIN') {
    handlePlayAgain(room);
  }
};

export default handlePlay;
