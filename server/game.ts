import { Card } from './types';

const suits = ['spade', 'diamond', 'club', 'heart'];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
export const HAND_CARDS_NUMBER = 7;

const getDeck = () => {
  const deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      const card = { value: values[x], suit: suits[i] };
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

const getHand = (deck: Card[]): Card[] => {
  return sortHand(deck.slice(0, HAND_CARDS_NUMBER));
};

export { getHand, getSuffledDeck, sortHand };
