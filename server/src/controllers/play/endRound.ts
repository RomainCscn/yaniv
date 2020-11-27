import { Room } from '../../core/room';
import {
  getHandScores,
  getPlayerAboveScoreLimit,
  getSmallestScore,
  getSmallestScores,
  addScoreToPlayers,
  getWinner,
} from '../../core/scores';

export const handleEndRound = (room: Room, playerUuid: string): void => {
  const player = room.getPlayerByUuid(playerUuid);
  const playersHandScore = getHandScores(room.players);
  const otherPlayersHandScore = playersHandScore.filter((s) => s.uuid !== playerUuid);
  const smallestScore = getSmallestScore(otherPlayersHandScore);
  const smallestOtherPlayersHandScore = getSmallestScores(otherPlayersHandScore);

  if (player.hasLost(smallestScore)) {
    const winnersUuid = smallestOtherPlayersHandScore.map(({ uuid }) => uuid);
    room.roundWinner = winnersUuid[0];
    addScoreToPlayers(playerUuid, playersHandScore, room.players, winnersUuid);
  } else {
    room.roundWinner = playerUuid;
    addScoreToPlayers(playerUuid, playersHandScore, room.players);
  }

  const players = room.getFormattedPlayers();
  const playerAboveScoreLimit = getPlayerAboveScoreLimit(players, room.scoreLimit());

  if (playerAboveScoreLimit) {
    room.dispatch({ type: 'GAME_OVER', data: { winner: getWinner(players) } });
  }

  const playersCard = Object.fromEntries(
    Object.values(room.players).map((player) => [player.uuid, player.hand]),
  );

  room.dispatch({
    type: 'END_OF_ROUND_UPDATE',
    data: {
      playersCard,
      playersScore: players,
      roundWinner: room.getFormattedPlayer(room.roundWinner),
      yanivCaller: room.getFormattedPlayer(playerUuid),
    },
  });
};
