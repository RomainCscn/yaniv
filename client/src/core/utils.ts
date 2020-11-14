import { Card } from '../types';

const findCardIndex = (card: Card, cards: Card[]) =>
  cards.findIndex((c: Card) => card.value === c.value && card.suit === c.suit);

const getCardUniqueIndex = (card: Card) => `${card.value}-${card.suit}`;

const getCardImagePath = (card: Card) =>
  `${process.env.PUBLIC_URL}cards/${card.suit.toUpperCase()}-${
    card.suit === 'joker' ? 0 : card.value
  }.svg`;

export { findCardIndex, getCardUniqueIndex, getCardImagePath };
