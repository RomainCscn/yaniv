import { Player } from './player';
import { FormattedPlayer, Players, Score } from '../types';

type VictoryState = 'LOSER' | 'WINNER';

export const getHandScores = (players: Players): Score[] =>
  Object.values(players).map((player) => ({ uuid: player.uuid, score: player.handScore() }));

export const getPlayerAboveScoreLimit = (
  players: FormattedPlayer[],
  scoreLimit: number,
): FormattedPlayer | undefined => players.find((player) => player.score >= scoreLimit);

export const getSmallestScore = (scores: Score[]): number =>
  scores.reduce((prev, curr) => (prev.score <= curr.score ? prev : curr)).score;

export const getSmallestScores = (scores: Score[]): Score[] =>
  scores.filter((s) => s.score === getSmallestScore(scores));

const getScoreToAdd = (score: number, state?: VictoryState): number => {
  switch (state) {
    case 'WINNER':
      return 0;
    case 'LOSER':
      return score + 30;
    default:
      return score;
  }
};

const getPlayerVictoryState = (
  playerUuid: string,
  uuid: string,
  winnersUuid?: string[],
): VictoryState | undefined => {
  if (!winnersUuid && playerUuid === uuid) {
    return 'WINNER';
  } else if (playerUuid === uuid) {
    return 'LOSER';
  } else if (winnersUuid?.includes(uuid)) {
    return 'WINNER';
  }
};

export const addScoreToPlayers = (
  playerUuid: string,
  playersHandScore: Score[],
  players: Record<string, Player>,
  winnersUuid?: string[],
): void =>
  playersHandScore.forEach(({ score, uuid }) => {
    const victoryState = getPlayerVictoryState(playerUuid, uuid, winnersUuid);
    const scoreToAdd = getScoreToAdd(score, victoryState);

    players[uuid].addScore(scoreToAdd);
  });

export const getWinner = (playersScore: FormattedPlayer[]): FormattedPlayer =>
  playersScore.reduce((previous, current) => (previous.score < current.score ? previous : current));
