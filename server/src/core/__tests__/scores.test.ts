/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addScoreToPlayers,
  getHandScores,
  getPlayerAboveScoreLimit,
  getSmallestScore,
  getSmallestScores,
  getWinner,
} from '../scores';
import { Player } from '../player';
import { CustomWebSocket, InitialPlayer } from '../../types';

describe('Scores related tests', () => {
  let playerA: Player, playerB: Player, playerC: Player;

  beforeEach(() => {
    playerA = new Player({ uuid: 'playerA' } as InitialPlayer, {} as CustomWebSocket);
    playerB = new Player({ uuid: 'playerB' } as InitialPlayer, {} as CustomWebSocket);
    playerC = new Player({ uuid: 'playerC' } as InitialPlayer, {} as CustomWebSocket);
  });

  it('should return the smallest score', () => {
    const scores = [
      { uuid: 'playerA', score: 3 },
      { uuid: 'playerB', score: 1 },
      { uuid: 'playerC', score: 2 },
    ];

    expect(getSmallestScore(scores)).toEqual(1);
  });

  it('should return the hand scores', () => {
    playerA.hand = [
      { suit: 'club', value: 1 },
      { suit: 'heart', value: 2 },
      { suit: 'diamond', value: 3 },
      { suit: 'spade', value: 4 },
    ];
    playerB.hand = [
      { suit: 'club', value: 12 },
      { suit: 'joker', value: 99 },
    ];

    expect(getHandScores({ playerA, playerB })).toEqual([
      { score: 10, uuid: 'playerA' },
      { score: 10, uuid: 'playerB' },
    ]);
  });

  it('should return the player above score limit', () => {
    playerA.score = 42;
    playerB.score = 54;

    expect(getPlayerAboveScoreLimit([playerA.format(), playerB.format()], 50)).toHaveProperty(
      'uuid',
      'playerB',
    );
    expect(getPlayerAboveScoreLimit([playerA.format(), playerB.format()], 60)).toBeUndefined();
  });

  it('should return the smallest scores of all players', () => {
    const scores = [
      { uuid: 'playerA', score: 3 },
      { uuid: 'playerB', score: 1 },
      { uuid: 'playerC', score: 1 },
    ];

    expect(getSmallestScores(scores)).toEqual([
      { uuid: 'playerB', score: 1 },
      { uuid: 'playerC', score: 1 },
    ]);
  });

  it('should return the game winner', () => {
    playerA.score = 54;
    playerB.score = 42;
    playerC.score = 66;

    expect(getWinner([playerA.format(), playerB.format(), playerC.format()])).toHaveProperty(
      'uuid',
      'playerB',
    );
  });

  describe('addScoreToPlayers', () => {
    it('should add score to players when the yaniv caller win', () => {
      const handScores = [
        { uuid: 'playerA', score: 1 },
        { uuid: 'playerB', score: 12 },
        { uuid: 'playerC', score: 4 },
      ];

      addScoreToPlayers('playerA', handScores, { playerA, playerB, playerC });
      expect(playerA.score).toEqual(0);
      expect(playerB.score).toEqual(12);
      expect(playerC.score).toEqual(4);
    });

    it('should add score to players when the yaniv caller lose and there is one winner', () => {
      const handScores = [
        { uuid: 'playerA', score: 7 },
        { uuid: 'playerB', score: 1 },
        { uuid: 'playerC', score: 4 },
      ];

      addScoreToPlayers('playerA', handScores, { playerA, playerB, playerC }, ['playerB']);
      expect(playerA.score).toEqual(37);
      expect(playerB.score).toEqual(0);
      expect(playerC.score).toEqual(4);
    });

    it('should add score to players when the yaniv caller lose and there is several winners', () => {
      const handScores = [
        { uuid: 'playerA', score: 7 },
        { uuid: 'playerB', score: 4 },
        { uuid: 'playerC', score: 4 },
      ];

      addScoreToPlayers('playerA', handScores, { playerA, playerB, playerC }, [
        'playerB',
        'playerC',
      ]);
      expect(playerA.score).toEqual(37);
      expect(playerB.score).toEqual(0);
      expect(playerC.score).toEqual(0);
    });
  });
});
