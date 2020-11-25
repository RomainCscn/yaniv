import { Player } from '../../core/player';
import { Room } from '../../core/room';
import { PlayedCards } from '../../types';

export const handleQuickPlay = (room: Room, player: Player, { thrownCards }: PlayedCards): void => {
  // disallow quick play when the round is finished
  if (!room.roundWinner) {
    room.thrownCards = thrownCards;
    room.dispatch({ type: 'SET_THROWN_CARDS', data: { thrownCards: room.getSortedThrownCards() } });

    const quickThrownCard = thrownCards[thrownCards.length - 1];
    player.removeCardFromHand(quickThrownCard);

    // send the hand to the player who dropped the card
    player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand }));

    // sync players to display other players cards
    Object.values(room.players).forEach((player) => {
      player.ws.send(JSON.stringify({ type: 'QUICK_PLAY_DONE' }));
      player.ws.send(
        JSON.stringify({ type: 'PLAYERS_UPDATE', players: room.getFormattedPlayers() }),
      );
    });
  }
};
