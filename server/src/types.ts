import * as WebSocket from 'ws';

export interface CustomWebSocket extends WebSocket {
  isAlive: boolean;
}

export type ActionType = 'DROP' | 'MAMIXTA' | 'PICK';

export interface Card {
  suit: string;
  value: number;
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

export interface User {
  avatarId: string;
  hand: Card[];
  score: number;
  scoreHistory: number[];
  username: string;
  ws: CustomWebSocket;
}

export type Users = Record<string, User>;
