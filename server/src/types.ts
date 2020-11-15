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

type RoomConfiguration = {
  handCardsNumber: 5 | 7;
  scoreLimit: 100 | 200;
};

export interface Room {
  activePlayer: null | string;
  configuration: RoomConfiguration;
  deck: Card[];
  roundWinner: null | string;
  thrownCards: Card[];
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
