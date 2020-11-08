import { sendThrownCards } from '../../dispatcher';
import { sortHand } from '../../game';
import { getPlayers } from '../../room';
import { Card, PlayedCards, Room, User } from '../../types';

export const handleDropAndPick = (
  room: Room,
  user: User,
  { notPickedCards, pickedCard, thrownCards }: PlayedCards,
): void => {
  sendThrownCards(room.users, thrownCards);

  thrownCards.forEach((c: Card) => {
    user.hand.splice(
      user.hand.findIndex(
        (handCard: Card) => handCard.value == c.value && handCard.suit === c.suit,
      ),
      1,
    );
  });

  // player picked one card from mutiple thrown cards
  if (pickedCard && notPickedCards) {
    user.hand = sortHand([...user.hand, pickedCard]);
    room.deck.push(...notPickedCards);
    // player picked the thrown card
  } else if (pickedCard) {
    user.hand = sortHand([...user.hand, pickedCard]);
    // player picked one card from the stack
  } else if (notPickedCards) {
    user.hand = sortHand([...user.hand, room.deck[0]]);
    room.deck = room.deck.slice(1);
    room.deck.push(...notPickedCards);
  }

  // send the hand to the user who picked the card
  user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));

  const playersUuid = Object.entries(room.users).map(([uuid]) => uuid);
  const activePlayerIndex = playersUuid.indexOf(room.activePlayer as string);
  const nextPlayerUuid =
    activePlayerIndex === playersUuid.length - 1
      ? playersUuid[0]
      : playersUuid[activePlayerIndex + 1];

  room.activePlayer = nextPlayerUuid;

  // sync players to display other players cards
  Object.entries(room.users).forEach(([, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: nextPlayerUuid }));
    user.ws.send(JSON.stringify({ type: 'SET_OTHER_PLAYERS_CARDS', players: getPlayers(room) }));
  });
};