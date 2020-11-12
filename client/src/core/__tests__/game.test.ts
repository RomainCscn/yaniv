import { canDropCards, canSelectCard, getCardsAfterPick, isAdjacent, isSameValue } from '../game';
import { Card } from '../../types';

const cardA1: Card = { suit: 'heart', value: 1 };
const cardA2: Card = { suit: 'heart', value: 2 };
const cardA3: Card = { suit: 'heart', value: 3 };
const cardA4: Card = { suit: 'heart', value: 4 };
const cardB1: Card = { suit: 'diamond', value: 1 };
const cardB2: Card = { suit: 'diamond', value: 2 };
const cardZ1: Card = { suit: 'club', value: 1 };

it('should return if two cards are adjacent', () => {
  expect(isAdjacent(cardA1, cardA1)).toBeFalsy();
  expect(isAdjacent(cardA1, cardA3)).toBeFalsy();
  expect(isAdjacent(cardA1, cardB2)).toBeFalsy();
  expect(isAdjacent(cardA1, cardB1)).toBeFalsy();

  expect(isAdjacent(cardA1, cardA2)).toBeTruthy();
  expect(isAdjacent(cardA2, cardA3)).toBeTruthy();
  expect(isAdjacent(cardA3, cardA4)).toBeTruthy();
});
it('should return if two cards have the same value', () => {
  expect(isSameValue(cardA1, cardA2)).toBeFalsy();
  expect(isSameValue(cardA1, cardB2)).toBeFalsy();

  expect(isSameValue(cardA1, cardB1)).toBeTruthy();
  expect(isSameValue(cardA1, cardZ1)).toBeTruthy();
});

it('should return if the player can select a given card', () => {
  expect(canSelectCard(cardA1, [])).toBeTruthy();
  expect(canSelectCard(cardA1, [cardB1, cardZ1])).toBeTruthy();
  expect(canSelectCard(cardA1, [cardB1, cardZ1])).toBeTruthy();
  expect(canSelectCard(cardA1, [cardA2, cardA3])).toBeTruthy();
  expect(canSelectCard(cardA1, [cardA3])).toBeTruthy();
  expect(canSelectCard(cardA1, [cardB2])).toBeFalsy();
});

it('should return if the player can drop the given cards', () => {
  expect(canDropCards([cardA1])).toBeTruthy();
  expect(canDropCards([cardA2])).toBeTruthy();
  expect(canDropCards([cardA1, cardB1])).toBeTruthy();
  expect(canDropCards([cardA1, cardB1, cardZ1])).toBeTruthy();
  expect(canDropCards([cardA1, cardA2, cardA3])).toBeTruthy();
  expect(canDropCards([cardA1, cardA2, cardA3, cardA4])).toBeTruthy();

  expect(canDropCards([cardA1, cardA3])).toBeFalsy();
  expect(canDropCards([cardA1, cardA2])).toBeFalsy();
  expect(canDropCards([cardA1, cardA2, cardB2])).toBeFalsy();
});

it('should return valid cards after a player pick a card', () => {
  expect(getCardsAfterPick(cardA1, [cardA2], [])).toEqual({
    pickedCard: cardA1,
    thrownCards: [cardA2],
  });
  expect(getCardsAfterPick(undefined, [cardA2], [cardA1])).toEqual({
    notPickedCards: [cardA1],
    thrownCards: [cardA2],
  });
  expect(getCardsAfterPick(cardA1, [cardA2, cardA3], [cardA1])).toEqual({
    pickedCard: cardA1,
    thrownCards: [cardA2, cardA3],
  });
  expect(getCardsAfterPick(cardA1, [cardA2, cardA3], [cardA1, cardB2])).toEqual({
    pickedCard: cardA1,
    notPickedCards: [cardB2],
    thrownCards: [cardA2, cardA3],
  });
});
