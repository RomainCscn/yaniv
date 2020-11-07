import { handleMultipleCardsDrop, handleSingleCardDrop } from './drop';
import { handleEndRound } from './endRound';
import { handleNextRound } from './nextRound';
import { handlePickDroppedCard, handlePickStackedCard } from './pick';

import { getPlayers } from '../../room';
import rooms from '../../rooms';
import { Card, User } from '../../types';

const getCurrentUser = (roomName: string, userUuid: string) => rooms[roomName].users[userUuid];

const handlePlay = (
  actionType: string,
  card: Card,
  cards: Card[],
  roomName: string,
  userUuid: string,
): void => {
  const room = rooms[roomName];
  const user = getCurrentUser(roomName, userUuid);

  if (actionType === 'DROP') {
    if (cards) {
      handleMultipleCardsDrop(room, user, cards);
    } else {
      handleSingleCardDrop(room, user, card);
    }
  } else if (actionType === 'PICK') {
    if (card) {
      handlePickDroppedCard(room, user, card);
    } else {
      handlePickStackedCard(room, user);
    }
    // send the hand to the user who picked the card
    user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));

    const playersUuid = Object.entries(room.users).map(([uuid]) => uuid);
    const activePlayerIndex = playersUuid.indexOf(room.activePlayer as string);
    const nextPlayerUuid =
      activePlayerIndex === playersUuid.length - 1
        ? playersUuid[0]
        : playersUuid[activePlayerIndex + 1];

    rooms[roomName].activePlayer = nextPlayerUuid;

    // sync players to display other players cards
    Object.entries(room.users).forEach(([, user]: [string, User]) => {
      user.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: nextPlayerUuid }));
      user.ws.send(JSON.stringify({ type: 'SET_OTHER_PLAYERS_CARDS', players: getPlayers(room) }));
    });
  } else if (actionType === 'MAMIXTA') {
    handleEndRound(room, userUuid);
  } else if (actionType === 'NEXT_ROUND') {
    handleNextRound(room);
  }
};

export default handlePlay;
