import { getCardValue, getHand, getSuffledDeck, sortHand } from '../cards';
import { Room } from '../room';
import { Card } from '../../types';

const deck: Card[] = [
  { suit: 'club', value: 1 },
  { suit: 'diamond', value: 2 },
  { suit: 'heart', value: 2 },
  { suit: 'spade', value: 10 },
  { suit: 'club', value: 10 },
  { suit: 'joker', value: 98 },
];

describe('Cards related tests', () => {
  it('should return valid card value', () => {
    expect(getCardValue({ suit: 'club', value: 1 })).toEqual(1);
    expect(getCardValue({ suit: 'diamond', value: 2 })).toEqual(2);
    expect(getCardValue({ suit: 'heart', value: 3 })).toEqual(3);
    expect(getCardValue({ suit: 'spade', value: 10 })).toEqual(10);
    expect(getCardValue({ suit: 'club', value: 11 })).toEqual(10);
    expect(getCardValue({ suit: 'club', value: 12 })).toEqual(10);
    expect(getCardValue({ suit: 'club', value: 10 })).toEqual(10);
  });

  it('should return a valid shuffled deck', () => {
    const shuffledDeck = getSuffledDeck();

    expect(shuffledDeck.length).toEqual(54);
  });

  it('should return a player hand', () => {
    expect(
      getHand({ deck, configuration: { handCardsNumber: 5, scoreLimit: 200 } } as Room, {
        order: 'asc',
        type: 'suit',
      }),
    ).toEqual([
      { suit: 'club', value: 1 },
      { suit: 'club', value: 10 },
      { suit: 'diamond', value: 2 },
      { suit: 'spade', value: 10 },
      { suit: 'heart', value: 2 },
    ]);
  });

  it('should return a sorted hand', () => {
    const hand: Card[] = [
      { suit: 'club', value: 7 },
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 13 },
      { suit: 'heart', value: 1 },
      { suit: 'diamond', value: 2 },
    ];

    const sortedHandBySuitAsc: Card[] = [
      { suit: 'club', value: 1 },
      { suit: 'club', value: 7 },
      { suit: 'diamond', value: 2 },
      { suit: 'diamond', value: 13 },
      { suit: 'heart', value: 1 },
    ];
    const sortedHandBySuitDesc: Card[] = [
      { suit: 'club', value: 7 },
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 13 },
      { suit: 'diamond', value: 2 },
      { suit: 'heart', value: 1 },
    ];

    const sortedHandByRankAsc: Card[] = [
      { suit: 'club', value: 1 },
      { suit: 'heart', value: 1 },
      { suit: 'diamond', value: 2 },
      { suit: 'club', value: 7 },
      { suit: 'diamond', value: 13 },
    ];
    const sortedHandByRankDesc: Card[] = [
      { suit: 'diamond', value: 13 },
      { suit: 'club', value: 7 },
      { suit: 'diamond', value: 2 },
      { suit: 'club', value: 1 },
      { suit: 'heart', value: 1 },
    ];

    expect(sortHand(hand, { order: 'asc', type: 'suit' })).toEqual(sortedHandBySuitAsc);
    expect(sortHand(hand, { order: 'desc', type: 'suit' })).toEqual(sortedHandBySuitDesc);
    expect(sortHand(hand, { order: 'asc', type: 'rank' })).toEqual(sortedHandByRankAsc);
    expect(sortHand(hand, { order: 'desc', type: 'rank' })).toEqual(sortedHandByRankDesc);
  });
});
