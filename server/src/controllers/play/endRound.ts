import { getCardValue } from '../../game';
import { Room, User } from '../../types';

const SCORE_LIMIT = 50;

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
    Object.entries(usersScore).forEach(
      ([uuid, score]: [string, number]) =>
        (room.users[uuid].score += userUuid === uuid ? score + 30 : score),
    );
  } else {
    room.roundWinner = userUuid;
    Object.entries(usersScore).forEach(
      ([uuid, score]: [string, number]) => (room.users[uuid].score += score),
    );
  }

  const playersScore = Object.entries(room.users).map(([, user]: [string, User]) => [
    user.username,
    user.score,
  ]);

  const playerAboveScoreLimit = playersScore.find(([, score]) => score >= SCORE_LIMIT);

  if (playerAboveScoreLimit) {
    const winner = playersScore.reduce((previous, current) =>
      previous[1] < current[1] ? previous : current,
    );
    console.log(room.roundWinner);
    Object.entries(room.users).forEach(([, user]: [string, User]) => {
      user.ws.send(JSON.stringify({ type: 'GAME_OVER', playersScore, winner: winner[0] }));
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
