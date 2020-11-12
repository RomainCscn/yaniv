import { Card } from '../types';

const CARDS_VALUE_SEQUENCES = '12345678910111213';

const isSameValue = (cardA: Card, cardB: Card) => cardA.value === cardB.value;

const isAdjacent = (cardA: Card, cardB: Card) =>
  cardA.suit === cardB.suit && (cardA.value === cardB.value - 1 || cardA.value === cardB.value + 1);

const canSelectCard = (card: Card, selectedCards: Card[]) => {
  if (selectedCards.length <= 0) {
    return true;
  }

  const sameValue = selectedCards.filter((c) => !isSameValue(card, c)).length <= 0;

  const hasOneAdjacent = selectedCards.find((c) => isAdjacent(card, c));

  return sameValue || !!hasOneAdjacent;
};

const canDropCards = (selectedCards: Card[]) => {
  if (selectedCards.length === 1) return true;

  const uniqueCardsValue = new Set(selectedCards.map((c) => c.value));
  const isUniqueValue = Array.from(uniqueCardsValue).length === 1;

  const consecutiveCards = selectedCards
    .map((c) => c.value)
    .sort((a, b) => a - b)
    .join('');

  const isConsecutive =
    CARDS_VALUE_SEQUENCES.indexOf(consecutiveCards) !== -1 && selectedCards.length >= 3;

  return isUniqueValue || isConsecutive;
};

const getCardsAfterPick = (card: undefined | Card, selectedCards: Card[], thrownCards: Card[]) => {
  if (card && thrownCards.length > 1) {
    // remove picked card from the thrown one
    const remainingThrownCards = thrownCards.filter(
      (thrownCard: Card) => thrownCard.value !== card.value || thrownCard.suit !== card.suit,
    );

    return {
      pickedCard: card,
      notPickedCards: remainingThrownCards,
      thrownCards: selectedCards,
    };
  } else {
    return {
      ...(card ? { pickedCard: card } : { notPickedCards: thrownCards }),
      thrownCards: selectedCards,
    };
  }
};

export { canDropCards, canSelectCard, getCardsAfterPick, isAdjacent, isSameValue };
