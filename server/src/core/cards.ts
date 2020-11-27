import { SUIT_ORDER, SUITS, VALUES } from '../constants';
import { Card, Room, Sort, SortOrder } from '../types';

export const getCardValue = (card: Card): number =>
  card.suit === 'joker' ? 0 : card.value <= 10 ? card.value : 10;

const getDeck = (): Card[] => {
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

export const getSuffledDeck = (): Card[] => shuffle(getDeck());

export const getHand = ({ configuration, deck }: Room, sort: Sort): Card[] =>
  sortHand(deck.slice(0, configuration.handCardsNumber), sort);

const sortByRank = (hand: Card[], order: SortOrder): Card[] =>
  hand.sort((a, b) => (order === 'desc' ? b.value - a.value : a.value - b.value));

const sortBySuit = (hand: Card[]): Card[] =>
  hand.sort((a, b) => SUIT_ORDER[a.suit] - SUIT_ORDER[b.suit]);

export const sortHand = (hand: Card[], { order, type }: Sort): Card[] => {
  const sortedByRank = sortByRank(hand, order);

  if (type === 'rank') {
    return sortedByRank;
  }

  return sortBySuit(sortedByRank);
};
