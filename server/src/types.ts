import * as WebSocket from 'ws';

import { JOKER, SUITS, VALUES } from './constants';
export interface CustomWebSocket extends WebSocket {
  isAlive: boolean;
}

export type ActionType = 'DROP' | 'PICK' | 'YANIV';

export interface Card {
  suit: typeof SUITS[number] | typeof JOKER;
  value: typeof VALUES[number] | 98 | 99;
}

export interface PlayedCards {
  notPickedCards: undefined | Card[];
  pickedCard: undefined | Card;
  thrownCards: Card[];
}

export interface Room {
  thrownCards: Card[];
  activePlayer: null | string;
  deck: Card[];
  roundWinner: null | string;
  users: Users;
}

export type SortOrder = 'asc' | 'desc';

export interface User {
  avatarId: string;
  hand: Card[];
  score: number;
  scoreHistory: number[];
  sortOrder: SortOrder;
  username: string;
  ws: CustomWebSocket;
}

export type Users = Record<string, User>;
