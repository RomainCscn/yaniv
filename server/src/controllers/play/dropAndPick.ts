import { sendThrownCards } from '../../core/dispatcher';
import { sortHand } from '../../core/game';
import { getFormattedPlayer, getFormattedPlayers } from '../../core/room';
import { Card, PlayedCards, Room, Player } from '../../types';

export const handleDropAndPick = (
  room: Room,
  player: Player,
  { notPickedCards, pickedCard, thrownCards }: PlayedCards,
): void => {
  room.thrownCards = thrownCards;
  sendThrownCards(room);

  thrownCards.forEach((c: Card) => {
    player.hand.splice(
      player.hand.findIndex(
        (handCard: Card) => handCard.value == c.value && handCard.suit === c.suit,
      ),
      1,
    );
  });

  let newCardInHand = { card: pickedCard, isFromStack: false };

  // player picked one card from mutiple thrown cards
  if (pickedCard && notPickedCards) {
    player.hand = sortHand([...player.hand, pickedCard], player.sort);
    room.deck.push(...notPickedCards);
    // player picked the thrown card
  } else if (pickedCard) {
    player.hand = sortHand([...player.hand, pickedCard], player.sort);
    // player picked one card from the stack
  } else if (notPickedCards) {
    newCardInHand = { card: room.deck[0], isFromStack: true };
    player.hand = sortHand([...player.hand, room.deck[0]], player.sort);
    room.deck = room.deck.slice(1);
    room.deck.push(...notPickedCards);
  }

  // send the hand to the player who picked the card
  player.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: player.hand, newCardInHand }));

  const playersUuid = Object.entries(room.players).map(([uuid]) => uuid);
  const activePlayerIndex = playersUuid.indexOf(room.activePlayer as string);

  const nextPlayerUuid =
    activePlayerIndex === playersUuid.length - 1
      ? playersUuid[0]
      : playersUuid[activePlayerIndex + 1];

  room.activePlayer = nextPlayerUuid;

  // sync players to display other players cards
  Object.entries(room.players).forEach(([, player]: [string, Player]) => {
    player.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: nextPlayerUuid }));
    player.ws.send(
      JSON.stringify({
        type: 'SET_PICKED_CARD',
        pickedCard,
        previousPlayer: getFormattedPlayer(room, playersUuid[activePlayerIndex]),
      }),
    );
    player.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', players: getFormattedPlayers(room) }));
  });
};
