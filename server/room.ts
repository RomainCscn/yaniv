import * as WebSocket from 'ws';

import { HAND_CARDS_NUMBER, getHand, getSuffledDeck } from './game';
import { Room, User } from './types';

export const assignHandToUser = (room: Room, user: User): void => {
  const userHand = getHand(room.deck);

  user.hand = userHand;
  room.deck = room.deck.slice(HAND_CARDS_NUMBER);
};

export const addUser = (
  userUuid: string,
  room: Room,
  username: string,
  userWs: WebSocket,
): void => {
  room.users[userUuid] = { hand: [], username, ws: userWs };
};

export default function initRoom(): Room {
  return {
    deck: getSuffledDeck(),
    activeCards: [],
    users: {},
  };
}
