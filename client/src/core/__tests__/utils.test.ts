import { findCardIndex, getCardUniqueIndex, getCardImagePath } from '../utils';

const cardA1 = { suit: 'a', value: 1 };
const cardA2 = { suit: 'a', value: 2 };
const cardB1 = { suit: 'b', value: 1 };
const cardZ1 = { suit: 'zzzz', value: 1 };
const cardZ2 = { suit: 'zzzz', value: 2 };

it('findCardIndex', () => {
  expect(findCardIndex(cardA1, [cardA1, cardA2, cardB1, cardZ1])).toBe(0);
  expect(findCardIndex(cardA2, [cardA1, cardA2, cardB1, cardZ1])).toBe(1);
  expect(findCardIndex(cardZ1, [cardA1, cardA2, cardB1, cardZ1])).toBe(3);
});

it('getCardUniqueIndex', () => {
  expect(getCardUniqueIndex(cardA1)).toEqual('1-a');
  expect(getCardUniqueIndex(cardZ1)).toEqual('1-zzzz');
});

it('getCardImagePath', () => {
  expect(getCardImagePath(cardA1)).toEqual('cards/A-1.svg');
  expect(getCardImagePath(cardZ2)).toEqual('cards/ZZZZ-2.svg');
});
