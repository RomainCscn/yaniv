import { SUITS, VALUES } from '../../constants';
import { Player } from '../../core/player';
import { Card, Room, SortOrder, SortType } from '../../types';

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

export const getSuffledDeck = (): Card[] => shuffle(getDeck());

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

export const getHand = (room: Room, sort: { order: SortOrder; type: SortType }): Card[] =>
  sortHand(room.deck.slice(0, room.configuration.handCardsNumber), sort);

export const sortHand = (hand: Card[], sort: { order: SortOrder; type: SortType }): Card[] => {
  if (sort.type === 'rank') {
    return hand.sort((a, b) => (sort.order === 'desc' ? b.value - a.value : a.value - b.value));
  }

  const order = { club: 1, diamond: 2, spade: 3, heart: 4, joker: 5 };

  return hand
    .sort((a, b) => (sort.order === 'desc' ? b.value - a.value : a.value - b.value))
    .sort((a, b) => order[a.suit] - order[b.suit]);
};
