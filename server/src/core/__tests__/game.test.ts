import { getCardValue, getHand, getSmallestScore, getSuffledDeck, sortHand } from '../game';
import { Card } from '../../types';

const scores = [
  { uuid: 'ghi', score: 3 },
  { uuid: 'abd', score: 1 },
  { uuid: 'def', score: 2 },
];

const deck: Card[] = [
  { suit: 'club', value: 1 },
  { suit: 'diamond', value: 2 },
  { suit: 'heart', value: 2 },
  { suit: 'spade', value: 10 },
  { suit: 'club', value: 10 },
];

const mockHandCardsNumber = jest.fn();
const mockSuits = jest.fn();
const mockValues = jest.fn();

jest.mock('../../constants.ts', () => ({
  get HAND_CARDS_NUMBER() {
    return mockHandCardsNumber();
  },
  get SUITS() {
    return mockSuits();
  },
  get VALUES() {
    return mockValues();
  },
}));

describe('game', () => {
  it('should return valid card value', () => {
    expect(getCardValue({ suit: 'club', value: 1 })).toEqual(1);
    expect(getCardValue({ suit: 'diamond', value: 2 })).toEqual(2);
    expect(getCardValue({ suit: 'heart', value: 3 })).toEqual(3);
    expect(getCardValue({ suit: 'spade', value: 10 })).toEqual(10);
    expect(getCardValue({ suit: 'club', value: 11 })).toEqual(10);
    expect(getCardValue({ suit: 'club', value: 12 })).toEqual(10);
    expect(getCardValue({ suit: 'club', value: 10 })).toEqual(10);
  });

  it('should return a player hand', () => {
    mockHandCardsNumber.mockReturnValue(1);
    expect(getHand(deck)).toEqual([{ suit: 'club', value: 1 }]);
  });

  it('should return the smallest score', () => {
    expect(getSmallestScore(scores)).toEqual(1);
  });

  it('should return a valid shuffled deck', () => {
    mockSuits.mockReturnValue(['spade', 'diamond']);
    mockValues.mockReturnValue([1, 2]);

    const shuffledDeck = getSuffledDeck();

    expect(shuffledDeck.findIndex((c) => c.suit === 'spade' && c.value === 1)).not.toEqual(-1);
    expect(shuffledDeck.findIndex((c) => c.suit === 'diamond' && c.value === 1)).not.toEqual(-1);
    expect(shuffledDeck.findIndex((c) => c.suit === 'spade' && c.value === 2)).not.toEqual(-1);
    expect(shuffledDeck.findIndex((c) => c.suit === 'diamond' && c.value === 1)).not.toEqual(-1);
    expect(shuffledDeck.findIndex((c) => c.suit === 'heart' && c.value === 1)).toEqual(-1);
  });

  it('should return a sorted hand', () => {
    const hand: Card[] = [
      { suit: 'club', value: 7 },
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 13 },
      { suit: 'heart', value: 1 },
      { suit: 'diamond', value: 2 },
    ];

    const sortedHand: Card[] = [
      { suit: 'club', value: 1 },
      { suit: 'club', value: 7 },
      { suit: 'diamond', value: 2 },
      { suit: 'diamond', value: 13 },
      { suit: 'heart', value: 1 },
    ];

    expect(sortHand(hand)).toEqual(sortedHand);
  });
});
