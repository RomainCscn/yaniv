import { HAND_CARDS_NUMBER, SUITS, VALUES } from '../constants';
import { Card } from '../types';

const getCardValue = (card: Card): number => (card.value <= 10 ? card.value : 10);

const getDeck = () => {
  const deck = [];

  for (let i = 0; i < SUITS.length; i++) {
    for (let j = 0; j < VALUES.length; j++) {
      const card = { value: VALUES[j], suit: SUITS[i] };
      deck.push(card);
    }
  }

  return deck;
};

const shuffle = (deck: Card[]) => {
  const shuffledDeck = [...deck];

  for (let i = 0; i < 1000; i++) {
    const location1 = Math.floor(Math.random() * shuffledDeck.length);
    const location2 = Math.floor(Math.random() * shuffledDeck.length);
    const tmp = shuffledDeck[location1];

    shuffledDeck[location1] = shuffledDeck[location2];
    shuffledDeck[location2] = tmp;
  }

  return shuffledDeck;
};

const getSuffledDeck = (): Card[] => shuffle(getDeck());

const sortHand = (hand: Card[]): Card[] => {
  return hand
    .sort((a, b) => b.value - a.value)
    .sort((a, b) => {
      if (a.suit < b.suit) {
        return -1;
      }

      if (a.suit > b.suit) {
        return 1;
      }

      return 0;
    });
};

const getHand = (deck: Card[]): Card[] => sortHand(deck.slice(0, HAND_CARDS_NUMBER));

const getSmallestScore = (scores: { uuid: string; score: number }[]): number =>
  scores.reduce((prev, curr) => (prev.score <= curr.score ? prev : curr)).score;

export { getCardValue, getHand, getSmallestScore, getSuffledDeck, sortHand };