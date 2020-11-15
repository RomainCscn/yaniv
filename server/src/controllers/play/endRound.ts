import { getFormattedPlayer } from '../../core/room';
import { getCardValue, getSmallestScore } from '../../core/game';
import { Room, User } from '../../types';

const getScores = (room: Room): { uuid: string; score: number }[] => {
  const usersScore: { uuid: string; score: number }[] = [];

  Object.entries(room.users).forEach(([uuid, user]: [string, User]) => {
    const handSum = user.hand.reduce((sum: number, card) => {
      return sum + getCardValue(card);
    }, 0);

    usersScore.push({ uuid, score: handSum });
  });

  return usersScore;
};

export const handleEndRound = (room: Room, userUuid: string): void => {
  const usersScore = getScores(room);
  const currentUserScore = usersScore.find((s) => s.uuid === userUuid)?.score;
  const otherPlayersScore = usersScore.filter((s) => s.uuid !== userUuid);
  const smallestScore = getSmallestScore(otherPlayersScore);
  const smallestOtherPlayersScore = otherPlayersScore.filter((s) => s.score === smallestScore);

  const currentUserLost =
    Object.keys(smallestOtherPlayersScore).length > 0 && smallestScore <= (currentUserScore ?? 0);

  if (currentUserLost) {
    room.roundWinner = smallestOtherPlayersScore[0].uuid;

    usersScore.forEach(({ uuid, score }) => {
      let scoreToAdd = score;
      if (smallestOtherPlayersScore.map((s) => s.uuid).includes(uuid)) {
        scoreToAdd = 0;
      } else if (userUuid === uuid) {
        scoreToAdd = score + 30;
      }
      room.users[uuid].score += scoreToAdd;
      room.users[uuid].scoreHistory.push(room.users[uuid].score);
    });
  } else {
    room.roundWinner = userUuid;
    usersScore.forEach(({ uuid, score }) => {
      room.users[uuid].score += uuid === userUuid ? 0 : score;
      room.users[uuid].scoreHistory.push(room.users[uuid].score);
    });
  }

  const playersScore = Object.entries(room.users).map(([uuid, user]: [string, User]) => ({
    score: user.score,
    scoreHistory: user.scoreHistory,
    uuid,
    username: user.username,
  }));

  const playerAboveScoreLimit = playersScore.find(
    (userScore) => userScore.score >= room.configuration.scoreLimit,
  );

  if (playerAboveScoreLimit) {
    const winner = playersScore.reduce((previous, current) =>
      previous.score < current.score ? previous : current,
    );

    Object.entries(room.users).forEach(([, user]: [string, User]) => {
      user.ws.send(
        JSON.stringify({ type: 'GAME_OVER', winner: getFormattedPlayer(room, winner.uuid) }),
      );
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
        roundWinner: getFormattedPlayer(room, room.roundWinner ?? ''),
      }),
    );
  });
};
