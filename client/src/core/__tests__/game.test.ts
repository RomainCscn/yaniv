import { canSelectCard, isAdjacent, isSameValue } from '../game';

const cardA1 = { suit: 'a', value: 1 };
const cardA2 = { suit: 'a', value: 2 };
const cardA3 = { suit: 'a', value: 3 };
const cardA4 = { suit: 'a', value: 4 };
const cardB1 = { suit: 'b', value: 1 };
const cardB2 = { suit: 'b', value: 2 };
const cardZ1 = { suit: 'zzzz', value: 1 };

it('isAdjacent', () => {
  expect(isAdjacent(cardA1, cardA1)).toBe(false);
  expect(isAdjacent(cardA1, cardA3)).toBe(false);
  expect(isAdjacent(cardA1, cardB2)).toBe(false);
  expect(isAdjacent(cardA1, cardB1)).toBe(false);

  expect(isAdjacent(cardA1, cardA2)).toBe(true);
  expect(isAdjacent(cardA2, cardA3)).toBe(true);
  expect(isAdjacent(cardA3, cardA4)).toBe(true);
});
it('isSameValue', () => {
  expect(isSameValue(cardA1, cardA2)).toBe(false);
  expect(isSameValue(cardA1, cardB2)).toBe(false);

  expect(isSameValue(cardA1, cardB1)).toBe(true);
  expect(isSameValue(cardA1, cardZ1)).toBe(true);
});

it('canSelectCard', () => {
  expect(canSelectCard(cardA1, [cardB1, cardZ1])).toBe(true);
  expect(canSelectCard(cardA1, [cardB1, cardZ1])).toBe(true);
  expect(canSelectCard(cardA1, [cardA2, cardA3])).toBe(true);
  expect(canSelectCard(cardA1, [cardB2])).toBe(false);
  expect(canSelectCard(cardA1, [cardA3])).toBe(false);
});
