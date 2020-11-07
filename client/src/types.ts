export interface Card {
  suit: string;
  value: number;
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
  hand: Card[];
  player: OtherPlayer;
  players: OtherPlayer[];
  playersCard: Record<string, Card[]>;
  playersScore: PlayerScore[];
  usernameList: string[];
  previousCards: Card[];
  type: ReceivedMessageType;
  uuid: string;
}

export type ReceivedMessageType =
  | 'NEW_ROUND'
  | 'PLAYERS_UPDATE'
  | 'REVEAL_OTHER_PLAYERS_CARDS'
  | 'SET_ACTIVE_PLAYER'
  | 'SET_ACTIVE_CARDS'
  | 'SET_OTHER_PLAYERS_CARDS'
  | 'SET_PLAYER_HAND'
  | 'SET_PREVIOUS_CARDS'
  | 'START_GAME'
  | 'UPDATE_SCORE';

export type MessageAction = 'JOIN' | 'PLAY' | 'READY_TO_PLAY' | 'START';

export type MessageActionType = 'DROP' | 'MAMIXTA' | 'NEXT_ROUND' | 'PICK';
