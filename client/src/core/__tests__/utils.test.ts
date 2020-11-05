import { findCardIndex } from '../utils';

const cardA1 = { suit: 'a', value: 1 };
const cardA2 = { suit: 'a', value: 2 };
const cardB1 = { suit: 'b', value: 1 };
const cardZ1 = { suit: 'zzzz', value: 1 };

it('findCardIndex', () => {
  expect(findCardIndex(cardA1, [cardA1, cardA2, cardB1, cardZ1])).toBe(0);
  expect(findCardIndex(cardA2, [cardA1, cardA2, cardB1, cardZ1])).toBe(1);
  expect(findCardIndex(cardZ1, [cardA1, cardA2, cardB1, cardZ1])).toBe(3);
});
