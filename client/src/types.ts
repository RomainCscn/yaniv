import { JOKER, SUITS, VALUES } from './constants';

export interface Card {
  suit: typeof SUITS[number] | typeof JOKER;
  value: typeof VALUES[number] | 98 | 99;
}

export type CustomError = 'GAME_ALREADY_STARTED' | 'TOO_MANY_PLAYERS';

export interface Message {
  content: string;
  player: Player;
  time: string;
}

export interface NewCard {
  card: Card;
  isFromStack: boolean;
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

export type RoomConfiguration = {
  handCardsNumber: 5 | 7;
  scoreLimit: 100 | 200;
};

export interface ReceivedMessage {
  configuration: RoomConfiguration;
  error: CustomError;
  hand: Card[];
  message: Message;
  newCardInHand?: { card: Card; isFromStack: boolean };
  pickedCard?: Card;
  player: Player;
  playerUuid: string;
  players: Player[];
  playersCard: Record<string, Card[]>;
  playersScore: PlayerScore[];
  previousPlayer: Player;
  sortOrder: SortOrder;
  thrownCards: Card[];
  roundWinner: Player;
  type: ReceivedMessageType;
  uuid: string;
  winner: Player;
  yanivCaller?: Player;
}

export type ReceivedMessageType =
  | 'ASSIGN_UUID'
  | 'CONFIGURATION_UPDATE'
  | 'END_OF_ROUND_UPDATE'
  | 'GAME_OVER'
  | 'NEW_MESSAGE'
  | 'NEW_ROUND'
  | 'PLAYER_UPDATE'
  | 'PLAYERS_UPDATE'
  | 'QUICK_PLAY_DONE'
  | 'SET_ACTIVE_PLAYER'
  | 'SET_INTIAL_SCORES'
  | 'SET_PLAYER_HAND'
  | 'SET_PICKED_CARD'
  | 'SET_OTHER_PLAYERS_CARDS'
  | 'SET_THROWN_CARDS'
  | 'START_GAME';

export type SortOrder = 'asc' | 'desc';

export type MessageAction =
  | 'CONFIGURATION'
  | 'JOIN'
  | 'MESSAGE'
  | 'PLAY'
  | 'READY_TO_PLAY'
  | 'START'
  | 'UPDATE';

export type MessageActionType =
  | 'DROP_AND_PICK'
  | 'JOINED_LOBBY'
  | 'NEXT_ROUND'
  | 'PLAY_AGAIN'
  | 'QUICK_PLAY'
  | 'YANIV';
