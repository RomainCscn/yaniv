import { sendThrownCards } from '../../core/dispatcher';
import { getFormattedPlayers } from '../../core/room';
import { Card, PlayedCards, Room, Player } from '../../types';

const removeCardFromHand = (player: Player, card: Card) => {
  player.hand.splice(
    player.hand.findIndex(
      (handCard: Card) => handCard.value == card.value && handCard.suit === card.suit,
    ),
    1,
  );
};

export const handleQuickPlay = (room: Room, player: Player, { thrownCards }: PlayedCards): void => {
  // disallow quick play when the round is finished
  if (!room.roundWinner) {
    room.thrownCards = thrownCards;
    sendThrownCards(room);

    const quickThrownCard = thrownCards[thrownCards.length - 1];

    removeCardFromHand(player, quickThrownCard);

    // send the hand to the player who dropped the card
    player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand }));

    // sync players to display other players cards
    Object.entries(room.players).forEach(([, player]: [string, Player]) => {
      player.ws.send(JSON.stringify({ type: 'QUICK_PLAY_DONE' }));
      player.ws.send(
        JSON.stringify({ type: 'PLAYERS_UPDATE', players: getFormattedPlayers(room) }),
      );
    });
  }
};
