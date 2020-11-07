import { removePreviousCards } from '../../dispatcher';
import { sortHand } from '../../game';
import { Card, Room, User } from '../../types';

export const handlePickDroppedCard = (room: Room, user: User, card: Card): void => {
  user.hand = sortHand([...user.hand, card]);

  // remove the card from the deck
  room.deck = room.deck.filter(
    (deckCard) => deckCard.value !== card.value || deckCard.suit !== card.suit,
  );

  removePreviousCards(room);
};

export const handlePickStackedCard = (room: Room, user: User): void => {
  // add the first card of the deck to the user hand
  user.hand = sortHand([...user.hand, room.deck[0]]);

  // remove the card from the deck
  room.deck = room.deck.slice(1);

  removePreviousCards(room);
};
