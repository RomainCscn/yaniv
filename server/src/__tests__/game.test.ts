import { getSmallestScore } from '../game';

const scores = [
  { uuid: 'abd', score: 1 },
  { uuid: 'def', score: 2 },
  { uuid: 'ghi', score: 3 },
];

it('getSmallestScores', () => {
  expect(getSmallestScore(scores)).toEqual(1);
});
