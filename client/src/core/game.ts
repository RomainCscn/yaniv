import { Card } from '../types';

const CARDS_VALUE_SEQUENCES = '12345678910111213';

const isSameValue = (cardA: Card, cardB: Card) => cardA.value === cardB.value;

const isAdjacent = (cardA: Card, cardB: Card) =>
  cardA.suit === cardB.suit && (cardA.value === cardB.value - 1 || cardA.value === cardB.value + 1);

const isAdjacentWithJoker = (cardA: Card, cardB: Card) =>
  cardA.suit === cardB.suit && (cardA.value === cardB.value - 2 || cardA.value === cardB.value + 2);

const getCardValue = (card: Card): number =>
  card.suit === 'joker' ? 0 : card.value <= 10 ? card.value : 10;

const canSelectCard = (card: Card, selectedCards: Card[]) => {
  if (selectedCards.length <= 0) {
    return true;
  }

  if (selectedCards.length === 1 && selectedCards[0].suit === 'joker') {
    return true;
  }

  const isJoker = card.suit === 'joker';
  const sameValue = selectedCards.filter((c) => !isSameValue(card, c)).length <= 0;
  const hasOneAdjacent = selectedCards.find((c) => isAdjacent(card, c));
  const hasOneAdjacentWithJoker = selectedCards.find((c) => isAdjacentWithJoker(card, c));

  return sameValue || !!hasOneAdjacent || !!hasOneAdjacentWithJoker || isJoker;
};

const canDropCards = (selectedCards: Card[]) => {
  if (selectedCards.length === 1) return selectedCards[0].suit !== 'joker';

  const uniqueCardsValue = new Set(selectedCards.map((c) => c.value));
  const isUniqueValue = Array.from(uniqueCardsValue).length === 1;

  const consecutiveCards = selectedCards
    .map((c) => (c.suit === 'joker' ? 0 : c.value))
    .sort((a, b) => a - b)
    .join('');

  const isConsecutive =
    consecutiveCards[0] !== '0' &&
    CARDS_VALUE_SEQUENCES.indexOf(consecutiveCards) !== -1 &&
    selectedCards.length >= 3;

  const cardsWithoutJoker = selectedCards
    .filter((c) => c.suit !== 'joker')
    .sort((a, b) => a.value - b.value);

  const isConsecutiveWithJoker =
    consecutiveCards[0] === '0' &&
    cardsWithoutJoker.some(
      (card, index) =>
        cardsWithoutJoker[index + 1] && card.value + 2 === cardsWithoutJoker[index + 1].value,
    );

  return isUniqueValue || isConsecutive || isConsecutiveWithJoker;
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

export {
  canDropCards,
  canSelectCard,
  getCardValue,
  getCardsAfterPick,
  isAdjacent,
  isAdjacentWithJoker,
  isSameValue,
};
