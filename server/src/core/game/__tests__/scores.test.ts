/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHandScores, getSmallestScore } from '../scores';
import { Room } from '../../../types';

describe('Scores related tests', () => {
  it('should return the smallest score', () => {
    const scores = [
      { uuid: 'ghi', score: 3 },
      { uuid: 'abd', score: 1 },
      { uuid: 'def', score: 2 },
    ];

    expect(getSmallestScore(scores)).toEqual(1);
  });

  it('should return the hand scores', () => {
    const players: any = {
      a: {
        hand: [
          { suit: 'club', value: 1 },
          { suit: 'heart', value: 2 },
          { suit: 'diamond', value: 3 },
          { suit: 'spade', value: 4 },
        ],
      },
      b: {
        hand: [
          { suit: 'club', value: 12 },
          { suit: 'joker', value: 99 },
        ],
      },
    };
    expect(getHandScores({ players } as Room)).toEqual([
      { score: 10, uuid: 'a' },
      { score: 10, uuid: 'b' },
    ]);
  });
});
