import { sendActiveCards } from '../../dispatcher';
import { Card, Room, User } from '../../types';

export const handleMultipleCardsDrop = ({ deck, users }: Room, user: User, cards: Card[]): void => {
  sendActiveCards(users, cards);

  // return the hand without the cards
  cards.forEach((c: Card) => {
    user.hand.splice(
      user.hand.findIndex(
        (handCard: Card) => handCard.value == c.value && handCard.suit === c.suit,
      ),
      1,
    );
  });

  // push back the cards so the deck is never empty
  deck.push(...cards);

  // send the hand to the user who dropped the cards
  user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
};

export const handleSingleCardDrop = ({ deck, users }: Room, user: User, card: Card): void => {
  sendActiveCards(users, [card]);

  // return the hand without the card
  user.hand = user.hand.filter(
    (handCard) => handCard.value !== card.value || handCard.suit !== card.suit,
  );

  // push back the card so the deck is never empty
  deck.push(card);

  // send the hand to the user who dropped the card
  user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
};
