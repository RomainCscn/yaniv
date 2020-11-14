import { HAND_CARDS_NUMBER, SUITS, VALUES } from '../constants';
import { Card, SortOrder } from '../types';

const getCardValue = (card: Card): number =>
  card.suit === 'joker' ? 0 : card.value <= 10 ? card.value : 10;

const getDeck = () => {
  const deck: Card[] = [];

  for (let i = 0; i < SUITS.length; i++) {
    for (let j = 0; j < VALUES.length; j++) {
      const card = { value: VALUES[j], suit: SUITS[i] };
      deck.push(card);
    }
  }

  deck.push({ suit: 'joker', value: 98 });
  deck.push({ suit: 'joker', value: 99 });

  return deck;
};

const shuffle = (deck: Card[]) => {
  const shuffledDeck = [...deck];

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = shuffledDeck[i];
    shuffledDeck[i] = shuffledDeck[j];
    shuffledDeck[j] = temp;
  }

  return shuffledDeck;
};

const getSuffledDeck = (): Card[] => shuffle(getDeck());

const sortHand = (hand: Card[], sortOrder: SortOrder = 'asc'): Card[] =>
  hand
    .sort((a, b) => (sortOrder === 'asc' ? a.value - b.value : b.value - a.value))
    .sort((a, b) => {
      if (a.suit < b.suit) {
        return -1;
      }

      if (a.suit > b.suit) {
        return 1;
      }

      return 0;
    });

const getHand = (deck: Card[], sortOrder: SortOrder = 'asc'): Card[] =>
  sortHand(deck.slice(0, HAND_CARDS_NUMBER), sortOrder);

const getSmallestScore = (scores: { uuid: string; score: number }[]): number =>
  scores.reduce((prev, curr) => (prev.score <= curr.score ? prev : curr)).score;

export { getCardValue, getHand, getSmallestScore, getSuffledDeck, sortHand };
