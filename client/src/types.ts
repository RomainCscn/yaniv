export interface Card {
  suit: string;
  value: number;
}

interface CustomError {
  code: 'GAME_ALREADY_STARTED' | 'TOO_MANY_PLAYERS';
}

export interface OtherPlayer {
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
  player: OtherPlayer;
  players: OtherPlayer[];
  playersCard: Record<string, Card[]>;
  playersScore: PlayerScore[];
  thrownCards: Card[];
  roundWinner: string;
  type: ReceivedMessageType;
  uuid: string;
  winner: string;
}

export type ReceivedMessageType =
  | 'END_OF_ROUND_UPDATE'
  | 'NEW_ROUND'
  | 'PLAYERS_UPDATE'
  | 'QUICK_PLAY_DONE'
  | 'SET_ACTIVE_PLAYER'
  | 'SET_OTHER_PLAYERS_CARDS'
  | 'SET_PLAYER_HAND'
  | 'SET_THROWN_CARDS'
  | 'START_GAME';

export type MessageAction = 'JOIN' | 'PLAY' | 'READY_TO_PLAY' | 'START' | 'UPDATE';

export type MessageActionType =
  | 'DROP_AND_PICK'
  | 'JOINED_WAITING_ROOM'
  | 'MAMIXTA'
  | 'NEXT_ROUND'
  | 'PLAY_AGAIN'
  | 'QUICK_PLAY';
