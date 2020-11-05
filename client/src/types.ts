export interface Card {
  suit: string;
  value: number;
}

export interface OtherPlayer {
  uuid: string;
  numberOfCards: number;
}

export interface ReceivedMessage {
  activeCards: Card[];
  hand: Card[];
  player: OtherPlayer;
  previousCards: Card[];
  type: ReceivedMessageType;
}

export type ReceivedMessageType =
  | 'SET_ACTIVE_CARDS'
  | 'SET_OTHER_PLAYERS_CARDS'
  | 'SET_PLAYER_HAND'
  | 'SET_PREVIOUS_CARDS';

export type MessageAction = 'JOIN' | 'PLAY';

export type MessageActionType = 'DROP' | 'MAMIXTA' | 'PICK';
