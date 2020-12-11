import {
  canDropCards,
  canSelectCard,
  getCardsAfterPick,
  getCardValue,
  isAdjacent,
  isAdjacentWithJoker,
  isSameValue,
} from '../game';
import { Card } from '../../types';

const cardH1: Card = { suit: 'heart', value: 1 };
const cardH2: Card = { suit: 'heart', value: 2 };
const cardH3: Card = { suit: 'heart', value: 3 };
const cardH4: Card = { suit: 'heart', value: 4 };
const cardD1: Card = { suit: 'diamond', value: 1 };
const cardD2: Card = { suit: 'diamond', value: 2 };
const cardC1: Card = { suit: 'club', value: 1 };
const cardC12: Card = { suit: 'club', value: 12 };
const cardJ1: Card = { suit: 'joker', value: 98 };
const cardJ2: Card = { suit: 'joker', value: 99 };

it('should return if two cards are adjacent', () => {
  expect(isAdjacent(cardH1, cardH1)).toBeFalsy();
  expect(isAdjacent(cardH1, cardH3)).toBeFalsy();
  expect(isAdjacent(cardH1, cardD2)).toBeFalsy();
  expect(isAdjacent(cardH1, cardD1)).toBeFalsy();

  expect(isAdjacent(cardH1, cardH2)).toBeTruthy();
  expect(isAdjacent(cardH2, cardH3)).toBeTruthy();
  expect(isAdjacent(cardH3, cardH4)).toBeTruthy();
});

it('should return if two cards are adjacent with joker', () => {
  expect(isAdjacentWithJoker(cardH1, cardH1)).toBeFalsy();
  expect(isAdjacentWithJoker(cardH1, cardD2)).toBeFalsy();
  expect(isAdjacentWithJoker(cardH1, cardD1)).toBeFalsy();

  expect(isAdjacentWithJoker(cardH1, cardH3)).toBeTruthy();
});
it('should return if two cards have the same value', () => {
  expect(isSameValue(cardH1, cardH2)).toBeFalsy();
  expect(isSameValue(cardH1, cardD2)).toBeFalsy();

  expect(isSameValue(cardH1, cardD1)).toBeTruthy();
  expect(isSameValue(cardH1, cardC1)).toBeTruthy();
});

it('should return if the player can select a given card', () => {
  expect(canSelectCard(cardH1, [])).toBeTruthy();
  expect(canSelectCard(cardJ1, [])).toBeTruthy();
  expect(canSelectCard(cardH1, [cardD1, cardC1])).toBeTruthy();
  expect(canSelectCard(cardH1, [cardD1, cardC1])).toBeTruthy();
  expect(canSelectCard(cardH1, [cardH2, cardH3])).toBeTruthy();
  expect(canSelectCard(cardH1, [cardH3])).toBeTruthy();
  expect(canSelectCard(cardJ1, [cardH1])).toBeTruthy();
  expect(canSelectCard(cardH2, [cardJ1])).toBeTruthy();

  expect(canSelectCard(cardH1, [cardD2])).toBeFalsy();
});

it('should return if the player can drop the given cards', () => {
  expect(canDropCards([cardH1])).toBeTruthy();
  expect(canDropCards([cardH2])).toBeTruthy();
  expect(canDropCards([cardH1, cardD1])).toBeTruthy();
  expect(canDropCards([cardH1, cardD1, cardC1])).toBeTruthy();
  expect(canDropCards([cardH1, cardH2, cardH3])).toBeTruthy();
  expect(canDropCards([cardH1, cardH2, cardH3, cardH4])).toBeTruthy();
  expect(canDropCards([cardH1, cardJ1, cardH3])).toBeTruthy();
  expect(canDropCards([cardH1, cardJ1, cardH3, cardH4])).toBeTruthy();
  expect(canDropCards([cardH1, cardH2, cardJ1, cardH4])).toBeTruthy();

  expect(canDropCards([cardH1, cardH3])).toBeFalsy();
  expect(canDropCards([cardH1, cardH2])).toBeFalsy();
  expect(canDropCards([cardH1, cardH2, cardD2])).toBeFalsy();
  expect(canDropCards([cardJ1, cardH1, cardH2])).toBeFalsy();
  expect(canDropCards([cardH1, cardH2, cardJ1])).toBeFalsy();
  expect(canDropCards([cardH1, cardJ1])).toBeFalsy();
  expect(
    canDropCards([cardJ1, { suit: 'club', value: 11 }, { suit: 'club', value: 12 }]),
  ).toBeFalsy();
});

it('should return valid cards after a player pick a card', () => {
  expect(getCardsAfterPick(cardH1, [cardH2], [])).toEqual({
    pickedCard: cardH1,
    thrownCards: [cardH2],
  });
  expect(getCardsAfterPick(undefined, [cardH2], [cardH1])).toEqual({
    notPickedCards: [cardH1],
    thrownCards: [cardH2],
  });
  expect(getCardsAfterPick(cardH1, [cardH2, cardH3], [cardH1])).toEqual({
    pickedCard: cardH1,
    thrownCards: [cardH2, cardH3],
  });
  expect(getCardsAfterPick(cardH1, [cardH2, cardH3], [cardH1, cardD2])).toEqual({
    pickedCard: cardH1,
    notPickedCards: [cardD2],
    thrownCards: [cardH2, cardH3],
  });
});

it('should return the card value', () => {
  expect(getCardValue(cardC1)).toEqual(1);
  expect(getCardValue(cardH4)).toEqual(4);
  expect(getCardValue(cardJ1)).toEqual(0);
  expect(getCardValue(cardJ2)).toEqual(0);
  expect(getCardValue(cardC12)).toEqual(10);
});
