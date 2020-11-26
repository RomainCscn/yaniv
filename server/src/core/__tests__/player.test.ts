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
});
