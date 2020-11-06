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

export interface ReceivedMessage {
  activeCards: Card[];
  hand: Card[];
  player: OtherPlayer;
  players: OtherPlayer[];
  playersCard: Record<string, Card[]>;
  usernameList: string[];
  previousCards: Card[];
  type: ReceivedMessageType;
  uuid: string;
}

export type ReceivedMessageType =
  | 'PLAYERS_UPDATE'
  | 'REVEAL_OTHER_PLAYERS_CARDS'
  | 'SET_ACTIVE_PLAYER'
  | 'SET_ACTIVE_CARDS'
  | 'SET_OTHER_PLAYERS_CARDS'
  | 'SET_PLAYER_HAND'
  | 'SET_PREVIOUS_CARDS'
  | 'START_GAME';

export type MessageAction = 'JOIN' | 'PLAY' | 'READY_TO_PLAY' | 'START';

export type MessageActionType = 'DROP' | 'MAMIXTA' | 'PICK';
