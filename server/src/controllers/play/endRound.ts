import { Player } from '../../core/player';
import { Room } from '../../core/room';
import { getHandScores, getSmallestScore } from '../../core/game/scores';
import { Score } from '../../types';

const getPlayersHandScore = (playersHandScore: Score[], playerUuid: string) => ({
  currentPlayerHandScore: playersHandScore.find((s) => s.uuid === playerUuid)?.score,
  otherPlayersHandScore: playersHandScore.filter((s) => s.uuid !== playerUuid),
});

const getSmallestScores = (otherPlayersHandScore: Score[]) => ({
  smallestScore: getSmallestScore(otherPlayersHandScore),
  smallestOtherPlayersHandScore: otherPlayersHandScore.filter(
    (s) => s.score === getSmallestScore(otherPlayersHandScore),
  ),
});

export const handleEndRound = (room: Room, playerUuid: string): void => {
  const playersHandScore = getHandScores(room);
  const { currentPlayerHandScore, otherPlayersHandScore } = getPlayersHandScore(
    playersHandScore,
    playerUuid,
  );
  const { smallestScore, smallestOtherPlayersHandScore } = getSmallestScores(otherPlayersHandScore);

  const currentPlayerLost =
    Object.keys(smallestOtherPlayersHandScore).length > 0 &&
    smallestScore <= (currentPlayerHandScore ?? 0);

  if (currentPlayerLost) {
    room.roundWinner = smallestOtherPlayersHandScore[0].uuid;

    playersHandScore.forEach(({ uuid, score }) => {
      let scoreToAdd = score;

      if (smallestOtherPlayersHandScore.map((s) => s.uuid).includes(uuid)) {
        scoreToAdd = 0;
      } else if (playerUuid === uuid) {
        scoreToAdd = score + 30;
      }

      room.players[uuid].score += scoreToAdd;
      room.players[uuid].scoreHistory.push(room.players[uuid].score);
    });
  } else {
    room.roundWinner = playerUuid;

    playersHandScore.forEach(({ uuid, score }) => {
      room.players[uuid].score += uuid === playerUuid ? 0 : score;
      room.players[uuid].scoreHistory.push(room.players[uuid].score);
    });
  }

  const playersScore = room.getPlayersScore();

  const playerAboveScoreLimit = playersScore.find(
    (playerScore) => playerScore.score >= room.configuration.scoreLimit,
  );

  if (playerAboveScoreLimit) {
    const winner = playersScore.reduce((previous, current) =>
      previous.score < current.score ? previous : current,
    );

    Object.values(room.players).forEach((player) =>
      player.ws.send(
        JSON.stringify({ type: 'GAME_OVER', winner: room.getFormattedPlayer(winner.uuid) }),
      ),
    );
  }

  const playersCard = Object.fromEntries(
    Object.entries(room.players).map(([uuid, player]: [string, Player]) => [uuid, player.hand]),
  );

  Object.values(room.players).forEach((player) =>
    player.ws.send(
      JSON.stringify({
        type: 'END_OF_ROUND_UPDATE',
        playersCard,
        playersScore,
        roundWinner: room.getFormattedPlayer(room.roundWinner ?? ''),
        yanivCaller: room.getFormattedPlayer(playerUuid),
      }),
    ),
  );
};
