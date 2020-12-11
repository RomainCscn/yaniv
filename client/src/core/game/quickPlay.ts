import { Card, NewCard } from '../../types';

const isSameCard = (cardA: Card, cardB: Card) =>
  cardA.suit === cardB.suit && cardA.value === cardB.value;

const uniqueCardsValue = (cards: Card[]) => [...new Set(cards.map((c) => c.value))].length === 1;

const isThreeOfAKind = (cards: Card[]) => cards.length === 3 && uniqueCardsValue(cards);

const isPairOrThreeOfAKind = (cards: Card[]) => cards.length === 2 || isThreeOfAKind(cards);

const isNewCardFromStack = (card: Card, newCard?: NewCard) =>
  newCard?.isFromStack && isSameCard(card, newCard.card);

const isCardValueSameAsThrownsOne = (card: Card, hand: Card[], thrownCards: Card[]) =>
  hand
    .filter((card) => card.value === thrownCards[0].value)
    .findIndex((c) => card.suit === c.suit && card.value === c.value) !== -1;

export const canQuickPlay = (
  thrownCards: Card[],
  quickPlayDone: boolean,
  hand: Card[],
  card: Card,
  newCard?: NewCard,
) => {
  // Handle the quick play on a pair / three of a kind
  if (!quickPlayDone && hand.length > 1 && isPairOrThreeOfAKind(thrownCards)) {
    return isCardValueSameAsThrownsOne(card, hand, thrownCards);
  }

  // Handle the quick play when the player drew a card with the same value as the one he discarded
  return isNewCardFromStack(card, newCard) && isCardValueSameAsThrownsOne(card, hand, thrownCards);
};
