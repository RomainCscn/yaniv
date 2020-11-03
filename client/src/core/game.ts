import { Card } from '../types';

const CARDS_VALUE_SEQUENCES = '12345678910111213';

const isSameValue = (cardA: Card, cardB: Card) => cardA.value === cardB.value;

const isAdjacent = (cardA: Card, cardB: Card) =>
  cardA.suit === cardB.suit &&
  (cardA.value === cardB.value - 1 || cardA.value === cardB.value + 1);

const canSelectCard = (card: Card, selectedCards: Card[]) => {
  if (selectedCards.length <= 0) {
    return true;
  }

  const sameValue =
    selectedCards.filter((c) => !isSameValue(card, c)).length <= 0;

  const hasOneAdjacent = selectedCards.find((c) => isAdjacent(card, c));

  return sameValue || !!hasOneAdjacent;
};

const canDropCard = (selectedCards: Card[]) => {
  if (selectedCards.length === 1) return true;

  const uniqueCardsValue = new Set(selectedCards.map((c) => c.value));
  const isUniqueValue = Array.from(uniqueCardsValue).length === 1;

  const consecutiveCards = selectedCards
    .map((c) => c.value)
    .sort((a, b) => a - b)
    .join('');

  const isConsecutive =
    CARDS_VALUE_SEQUENCES.indexOf(consecutiveCards) !== -1 &&
    selectedCards.length >= 3;

  return isUniqueValue || isConsecutive;
};

export { canDropCard, canSelectCard, isAdjacent, isSameValue };
