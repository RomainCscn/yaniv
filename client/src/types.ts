import { JOKER, SUITS, VALUES } from './constants';

export interface Card {
  suit: typeof SUITS[number] | typeof JOKER;
  value: typeof VALUES[number] | 98 | 99;
}

export type CustomError = 'GAME_ALREADY_STARTED' | 'TOO_MANY_PLAYERS';

export interface ChatMessage {
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
  hand?: Card[];
  numberOfCards?: number;
  score?: number;
  scoreHistory?: number[];
  sort: Sort;
  username: string;
  uuid: string;
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
  message: ChatMessage;
  newCardInHand?: { card: Card; isFromStack: boolean };
  pickedCard?: Card;
  player: Player;
  playerUuid: string;
  players: Player[];
  playersCard: Record<string, Card[]>;
  playersScore: PlayerScore[];
  previousPlayer: Player;
  sort: Sort;
  thrownCards: Card[];
  roundWinner: Player;
  type: ReceivedMessageType;
  uuid: string;
  winner: Player;
  yanivCaller?: Player;
}

export type ReceivedMessageType =
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
  | 'SET_PLAYER'
  | 'SET_PLAYER_HAND'
  | 'SET_PICKED_CARD'
  | 'SET_THROWN_CARDS'
  | 'START_GAME';

export type SortOrder = 'asc' | 'desc';
export type SortType = 'rank' | 'suit';
export interface Sort {
  order: SortOrder;
  type: SortType;
}

export type MessageAction =
  | 'BACK_TO_LOBBY'
  | 'CONFIGURATION'
  | 'JOIN'
  | 'MESSAGE'
  | 'PLAY'
  | 'READY_TO_PLAY'
  | 'START'
  | 'UPDATE';

export type MessageActionType =
  | 'BACK'
  | 'DROP_AND_PICK'
  | 'JOINED_LOBBY'
  | 'NEXT_ROUND'
  | 'PLAY_AGAIN'
  | 'QUICK_PLAY'
  | 'YANIV';
