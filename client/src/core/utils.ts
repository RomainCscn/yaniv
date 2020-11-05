import { Card } from '../types';

const findCardIndex = (card: Card, cards: Card[]) =>
  cards.findIndex((c: Card) => card.value === c.value && card.suit === c.suit);

const getCardUniqueIndex = (card: Card) => `${card.value}-${card.suit}`;

export { findCardIndex, getCardUniqueIndex };
