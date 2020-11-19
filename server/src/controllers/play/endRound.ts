import { getFormattedPlayer } from '../../core/room';
import { getCardValue, getSmallestScore } from '../../core/game';
import { Room, Player } from '../../types';

const getScores = (room: Room): { uuid: string; score: number }[] => {
  const playersScore: { uuid: string; score: number }[] = [];

  Object.entries(room.players).forEach(([uuid, player]: [string, Player]) => {
    const handSum = player.hand.reduce((sum: number, card) => {
      return sum + getCardValue(card);
    }, 0);

    playersScore.push({ uuid, score: handSum });
  });

  return playersScore;
};

export const handleEndRound = (room: Room, playerUuid: string): void => {
  let playersScore = getScores(room);
  const currentPlayerScore = playersScore.find((s) => s.uuid === playerUuid)?.score;
  const otherPlayersScore = playersScore.filter((s) => s.uuid !== playerUuid);
  const smallestScore = getSmallestScore(otherPlayersScore);
  const smallestOtherPlayersScore = otherPlayersScore.filter((s) => s.score === smallestScore);

  const currentPlayerLost =
    Object.keys(smallestOtherPlayersScore).length > 0 && smallestScore <= (currentPlayerScore ?? 0);

  if (currentPlayerLost) {
    room.roundWinner = smallestOtherPlayersScore[0].uuid;

    playersScore.forEach(({ uuid, score }) => {
      let scoreToAdd = score;
      if (smallestOtherPlayersScore.map((s) => s.uuid).includes(uuid)) {
        scoreToAdd = 0;
      } else if (playerUuid === uuid) {
        scoreToAdd = score + 30;
      }
      room.players[uuid].score += scoreToAdd;
      room.players[uuid].scoreHistory.push(room.players[uuid].score);
    });
  } else {
    room.roundWinner = playerUuid;
    playersScore.forEach(({ uuid, score }) => {
      room.players[uuid].score += uuid === playerUuid ? 0 : score;
      room.players[uuid].scoreHistory.push(room.players[uuid].score);
    });
  }

  playersScore = Object.entries(room.players).map(([uuid, player]: [string, Player]) => ({
    score: player.score,
    scoreHistory: player.scoreHistory,
    uuid,
    username: player.username,
  }));

  const playerAboveScoreLimit = playersScore.find(
    (playerScore) => playerScore.score >= room.configuration.scoreLimit,
  );

  if (playerAboveScoreLimit) {
    const winner = playersScore.reduce((previous, current) =>
      previous.score < current.score ? previous : current,
    );

    Object.entries(room.players).forEach(([, player]: [string, Player]) => {
      player.ws.send(
        JSON.stringify({ type: 'GAME_OVER', winner: getFormattedPlayer(room, winner.uuid) }),
      );
    });
  }

  const playersCard = Object.fromEntries(
    Object.entries(room.players).map(([uuid, player]: [string, Player]) => [uuid, player.hand]),
  );

  Object.entries(room.players).forEach(([, player]: [string, Player]) => {
    player.ws.send(
      JSON.stringify({
        type: 'END_OF_ROUND_UPDATE',
        playersCard,
        playersScore,
        roundWinner: getFormattedPlayer(room, room.roundWinner ?? ''),
        yanivCaller: getFormattedPlayer(room, playerUuid),
      }),
    );
  });
};
