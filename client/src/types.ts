import { SUITS, VALUES } from './constants';

export interface Card {
  suit: typeof SUITS[number];
  value: typeof VALUES[number];
}

interface CustomError {
  code: 'GAME_ALREADY_STARTED' | 'TOO_MANY_PLAYERS';
}

export interface Player {
  avatar: string;
  username: string;
  uuid: string;
  numberOfCards?: number;
  hand?: Card[];
}

export type PlayerScore = {
  score: number;
  scoreHistory: number[];
  uuid: string;
  username: string;
};

export interface ReceivedMessage {
  error: CustomError;
  hand: Card[];
  player: Player;
  players: Player[];
  playersCard: Record<string, Card[]>;
  playersScore: PlayerScore[];
  thrownCards: Card[];
  roundWinner: Player;
  type: ReceivedMessageType;
  uuid: string;
  winner: Player;
}

export type ReceivedMessageType =
  | 'END_OF_ROUND_UPDATE'
  | 'NEW_ROUND'
  | 'PLAYERS_UPDATE'
  | 'QUICK_PLAY_DONE'
  | 'SET_ACTIVE_PLAYER'
  | 'SET_INTIAL_SCORES'
  | 'SET_PLAYER_HAND'
  | 'SET_OTHER_PLAYERS_CARDS'
  | 'SET_THROWN_CARDS'
  | 'START_GAME';

export type MessageAction = 'JOIN' | 'PLAY' | 'READY_TO_PLAY' | 'START' | 'UPDATE';

export type MessageActionType =
  | 'DROP_AND_PICK'
  | 'JOINED_LOBBY'
  | 'NEXT_ROUND'
  | 'PLAY_AGAIN'
  | 'QUICK_PLAY'
  | 'YANIV';
