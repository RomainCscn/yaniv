export interface Card {
  suit: string;
  value: number;
}

interface CustomError {
  code: 'GAME_ALREADY_STARTED' | 'TOO_MANY_PLAYERS';
}

export interface OtherPlayer {
  username: string;
  uuid: string;
  numberOfCards: number;
  hand?: Card[];
}

export interface PlayerScore {
  [key: string]: number;
}

export interface ReceivedMessage {
  activeCards: Card[];
  error: CustomError;
  hand: Card[];
  player: OtherPlayer;
  players: OtherPlayer[];
  playersCard: Record<string, Card[]>;
  playersScore: PlayerScore[];
  usernameList: string[];
  previousCards: Card[];
  roundWinner: string;
  type: ReceivedMessageType;
  uuid: string;
  winner: string;
}

export type ReceivedMessageType =
  | 'END_OF_ROUND_UPDATE'
  | 'NEW_ROUND'
  | 'PLAYERS_UPDATE'
  | 'SET_ACTIVE_PLAYER'
  | 'SET_ACTIVE_CARDS'
  | 'SET_OTHER_PLAYERS_CARDS'
  | 'SET_PLAYER_HAND'
  | 'SET_PREVIOUS_CARDS'
  | 'START_GAME';

export type MessageAction = 'JOIN' | 'PLAY' | 'READY_TO_PLAY' | 'START';

export type MessageActionType =
  | 'DROP'
  | 'JOINED_WAITING_ROOM'
  | 'MAMIXTA'
  | 'NEXT_ROUND'
  | 'PICK'
  | 'PLAY_AGAIN'
  | 'REQUEST_PLAYING_ROOM'
  | 'REQUEST_WAITING_ROOM';
