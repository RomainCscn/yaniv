import * as WebSocket from 'ws';

import { Player } from './core/player';
import { Room } from './core/room';
import { JOKER, SUITS, VALUES } from './constants';
export interface CustomWebSocket extends WebSocket {
  isAlive: boolean;
}

export type Action =
  | 'CONFIGURATION'
  | 'JOIN'
  | 'MESSAGE'
  | 'PLAY'
  | 'READY_TO_PLAY'
  | 'START'
  | 'UPDATE';

export type ActionType =
  | 'BACK'
  | 'DROP_AND_PICK'
  | 'JOINED_LOBBY'
  | 'NEXT_ROUND'
  | 'PLAY_AGAIN'
  | 'QUICK_PLAY'
  | 'YANIV';

export interface Card {
  suit: typeof SUITS[number] | typeof JOKER;
  value: typeof VALUES[number] | 98 | 99;
}

export interface Data {
  action: Action;
  actionType: ActionType;
  cards: PlayedCards;
  configuration: RoomConfiguration;
  message: string;
  player: InitialPlayer;
  roomId: string;
  sessionUuid: string;
  sort: Sort;
  ws: CustomWebSocket;
}

export type Handler = (
  room: Room,
  data: Data & { sessionUuid: string; ws: CustomWebSocket },
) => void;

export interface FormattedPlayer {
  avatar: string;
  numberOfCards: number;
  sort: Sort;
  score: number;
  scoreHistory: number[];
  username: string;
  uuid: string;
}

export type InitialPlayer = Pick<Player, 'avatar' | 'sort' | 'username' | 'uuid'>;

export type MessageType =
  | 'ASSIGN_UUID'
  | 'BACK_TO_LOBBY'
  | 'CONFIGURATION_UPDATE'
  | 'END_OF_ROUND_UPDATE'
  | 'GAME_OVER'
  | 'JOIN_ONGOING_GAME'
  | 'NEW_MESSAGE'
  | 'NEW_ROUND'
  | 'PLAYER_UPDATE'
  | 'PLAYERS_UPDATE'
  | 'QUICK_PLAY_DONE'
  | 'SET_ACTIVE_PLAYER'
  | 'SET_INITIAL_SCORES'
  | 'SET_PICKED_CARD'
  | 'SET_PLAYER_HAND'
  | 'SET_THROWN_CARDS'
  | 'START_GAME';

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
