import * as WebSocket from 'ws';

export type ActionType = 'DROP' | 'MAMIXTA' | 'PICK';

export interface Card {
  suit: string;
  value: number;
}

export interface Room {
  activeCards: Card[];
  activePlayer: null | string;
  deck: Card[];
  users: Users;
}

export interface User {
  hand: Card[];
  score: number;
  username: string;
  ws: WebSocket;
}

export type Users = Record<string, User>;
