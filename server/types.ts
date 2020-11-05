import * as WebSocket from 'ws';

export interface Card {
  suit: string;
  value: number;
}

export interface Room {
  deck: Card[];
  activeCards: Card[];
  users: Users;
}

export interface User {
  hand: Card[];
  username: string;
  ws: WebSocket;
}

export type Users = Record<string, User>;
