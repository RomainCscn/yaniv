import { getCardValue } from './cards';
import { Player } from '../../core/player';
import { Score, Room } from '../../types';

export const getHandScores = ({ players }: Room): Score[] =>
  Object.entries(players).map(([uuid, player]: [string, Player]) => {
    const handSum = player.hand.reduce((sum: number, card) => sum + getCardValue(card), 0);

    return { uuid, score: handSum };
  });

export const getSmallestScore = (scores: Score[]): number =>
  scores.reduce((prev, curr) => (prev.score <= curr.score ? prev : curr)).score;
