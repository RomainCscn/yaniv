import * as WebSocket from 'ws';

import { HAND_CARDS_NUMBER, getHand, getSuffledDeck } from './game';
import { Room } from './types';

export const addUser = (userUuid: string, room: Room, userWs: WebSocket): void => {
  const userHand = getHand(room.deck);

  room.users[userUuid] = { hand: userHand, ws: userWs };
  room.deck = room.deck.slice(HAND_CARDS_NUMBER);

  userWs.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: userHand }));
};

export default function initRoom(): Room {
  return {
    deck: getSuffledDeck(),
    activeCards: [],
    users: {},
  };
}
