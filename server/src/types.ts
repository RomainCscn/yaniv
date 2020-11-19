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

export interface FormattedPlayer {
  avatar: string;
  numberOfCards: number;
  sortOrder: SortOrder;
  username: string;
  uuid: string;
}

export interface Message {
  content: string;
  player: FormattedPlayer;
  time: string;
}

export interface PlayedCards {
  notPickedCards: undefined | Card[];
  pickedCard: undefined | Card;
  thrownCards: Card[];
}

export type RoomConfiguration = {
  handCardsNumber: 5 | 7;
  scoreLimit: 100 | 200;
};

export interface Room {
  activePlayer: null | string;
  configuration: RoomConfiguration;
  deck: Card[];
  roundWinner: null | string;
  thrownCards: Card[];
  players: Players;
}

export type SortOrder = 'asc' | 'desc';

export interface Player {
  avatar: string;
  hand: Card[];
  score: number;
  scoreHistory: number[];
  sessionUuid: string;
  sortOrder: SortOrder;
  username: string;
  uuid: string;
  ws: CustomWebSocket;
}

export type Players = Record<string, Player>;
