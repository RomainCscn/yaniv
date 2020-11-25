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
    player.send({ type: 'SET_PLAYER_HAND', data: { hand: player.hand } });

    // sync players to display other players cards
    room.dispatchMultiple([
      { type: 'QUICK_PLAY_DONE' },
      { type: 'PLAYERS_UPDATE', data: { players: room.getFormattedPlayers() } },
    ]);
  }
};
