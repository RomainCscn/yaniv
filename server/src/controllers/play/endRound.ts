import { getCardValue } from '../../game';
import { Room, User } from '../../types';

const SCORE_LIMIT = 200;

const getScores = (room: Room): Record<string, number> => {
  const usersScore: Record<string, number> = {};

  Object.entries(room.users).forEach(([uuid, user]: [string, User]) => {
    const handSum = user.hand.reduce((sum: number, card) => {
      return sum + getCardValue(card);
    }, 0);

    usersScore[uuid] = handSum;
  });

  return usersScore;
};

export const handleEndRound = (room: Room, userUuid: string): void => {
  const usersScore = getScores(room);
  const currentUserScore = usersScore[userUuid];

  const lowerScoreThanCurrent = Object.entries(usersScore).filter(
    ([uuid, score]: [string, number]) => uuid !== userUuid && currentUserScore >= score,
  );

  if (lowerScoreThanCurrent.length > 0) {
    room.roundWinner = lowerScoreThanCurrent[0][0];
    Object.entries(usersScore).forEach(([uuid, score]: [string, number]) => {
      const actualScore = userUuid === uuid ? score + 30 : score;
      room.users[uuid].score += actualScore;
      room.users[uuid].scoreHistory.push(room.users[uuid].score);
    });
  } else {
    room.roundWinner = userUuid;
    Object.entries(usersScore).forEach(([uuid, score]: [string, number]) => {
      room.users[uuid].score += score;
      room.users[uuid].scoreHistory.push(room.users[uuid].score);
    });
  }

  const playersScore = Object.entries(room.users).map(([uuid, user]: [string, User]) => ({
    score: user.score,
    scoreHistory: user.scoreHistory,
    uuid,
    username: user.username,
  }));

  const playerAboveScoreLimit = playersScore.find((userScore) => userScore.score >= SCORE_LIMIT);

  if (playerAboveScoreLimit) {
    const winner = playersScore.reduce((previous, current) =>
      previous.score < current.score ? previous : current,
    );

    Object.entries(room.users).forEach(([, user]: [string, User]) => {
      user.ws.send(JSON.stringify({ type: 'GAME_OVER', playersScore, winner: winner.username }));
    });
  }

  const playersCard = Object.fromEntries(
    Object.entries(room.users).map(([uuid, user]: [string, User]) => [uuid, user.hand]),
  );

  Object.entries(room.users).forEach(([, user]: [string, User]) => {
    user.ws.send(
      JSON.stringify({
        type: 'END_OF_ROUND_UPDATE',
        playersCard,
        playersScore,
        roundWinner: room.roundWinner,
      }),
    );
  });
};
