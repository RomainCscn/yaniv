import { sendThrownCards } from '../../core/dispatcher';
import { getFormattedPlayers } from '../../core/room';
import { Card, PlayedCards, Room, User } from '../../types';

export const handleQuickPlay = (room: Room, user: User, { thrownCards }: PlayedCards): void => {
  // disallow quick play when the round is finished
  if (!room.roundWinner) {
    room.thrownCards = thrownCards;
    sendThrownCards(room);

    const quickThrownCard = thrownCards[thrownCards.length - 1];

    user.hand.splice(
      user.hand.findIndex(
        (handCard: Card) =>
          handCard.value == quickThrownCard.value && handCard.suit === quickThrownCard.suit,
      ),
      1,
    );

    // send the hand to the user who dropped the card
    user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));

    // sync players to display other players cards
    Object.entries(room.users).forEach(([, user]: [string, User]) => {
      user.ws.send(JSON.stringify({ type: 'QUICK_PLAY_DONE' }));
      user.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', players: getFormattedPlayers(room) }));
    });
  }
};
