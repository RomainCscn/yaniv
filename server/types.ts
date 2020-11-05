import WebSocket from 'ws';

export interface Card {
  suit: string;
  value: number;
}

export interface Room {
  deck: Card[];
  activeCard: Card;
  users: Users;
}

export interface User {
  hand: Card[];
  ws: WebSocket;
}

export type Users = Record<string, User>;
