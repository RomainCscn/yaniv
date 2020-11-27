import { CustomWebSocket, InitialPlayer } from '../../types';
import { Player } from '../player';

describe('player', () => {
  it('should remove a card from the user hand', () => {
    const player = new Player({} as InitialPlayer, {} as CustomWebSocket);
    player.hand = [
      { suit: 'club', value: 1 },
      { suit: 'heart', value: 2 },
      { suit: 'diamond', value: 3 },
      { suit: 'spade', value: 4 },
    ];

    player.removeCardFromHand({ suit: 'spade', value: 4 });

    expect(player.hand).toEqual([
      { suit: 'club', value: 1 },
      { suit: 'heart', value: 2 },
      { suit: 'diamond', value: 3 },
    ]);
  });

  it('should update the player properties', () => {
    const player = new Player({} as InitialPlayer, {} as CustomWebSocket);
    player.update({ avatar: 'avatar', score: 10, username: 'Romain' });

    expect(player.avatar).toEqual('avatar');
    expect(player.score).toEqual(10);
    expect(player.username).toEqual('Romain');
  });

  it('should add score to the player', () => {
    const player = new Player({} as InitialPlayer, {} as CustomWebSocket);

    player.addScore(42);
    expect(player.score).toEqual(42);
    expect(player.scoreHistory).toEqual([42]);

    player.addScore(0);
    expect(player.score).toEqual(42);
    expect(player.scoreHistory).toEqual([42, 42]);
  });

  it('should return if the player lost the round', () => {
    const player = new Player({} as InitialPlayer, {} as CustomWebSocket);
    player.hand = [{ suit: 'diamond', value: 9 }];

    expect(player.hasLost(3)).toBeTruthy();
    expect(player.hasLost(9)).toBeTruthy();
    expect(player.hasLost(12)).toBeFalsy();
  });
});
