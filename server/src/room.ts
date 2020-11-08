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
  room.users[userUuid] = { hand: [], score: 0, username, ws: userWs };
};

export const getPlayers = (
  room: Room,
): { uuid: string; username: string; numberOfCards: number }[] =>
  Object.entries(room.users).map(([uuid, user]: [string, User]) => ({
    uuid,
    username: user.username,
    numberOfCards: user.hand.length,
  }));

export const resetDeck = (room: Room, { resetScore = false } = {}): void => {
  room.deck = getSuffledDeck();
  room.thrownCards = [];
  room.activePlayer = room.roundWinner;
  room.roundWinner = null;

  if (resetScore) Object.entries(room.users).forEach(([, user]) => (user.score = 0));
};

export default function initRoom(): Room {
  return {
    thrownCards: [],
    activePlayer: null,
    deck: getSuffledDeck(),
    roundWinner: null,
    users: {},
  };
}
