import * as WebSocket from 'ws';

import { Player } from './core/player';
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
  sort: {
    order: SortOrder;
    type: SortType;
  };
  username: string;
  uuid: string;
}

export type InitialPlayer = Pick<Player, 'avatar' | 'sort' | 'username' | 'uuid'>;

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

export type Players = Record<string, Player>;

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

export interface Score {
  uuid: string;
  score: number;
}

export type Sort = {
  order: SortOrder;
  type: SortType;
};
export type SortOrder = 'asc' | 'desc';
export type SortType = 'rank' | 'suit';
