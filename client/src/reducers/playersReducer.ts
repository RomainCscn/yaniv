import { Card, Player } from '../types';

enum ActionType {
  END_OF_ROUND_UPDATE = 'END_OF_ROUND_UPDATE',
  SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER',
  SET_GAME_WINNER = 'SET_GAME_WINNER',
  SET_ROUND_WINNER = 'SET_ROUND_WINNER',
  SET_PLAYER = 'SET_PLAYER',
  SET_PLAYER_HAND = 'SET_PLAYER_HAND',
  SET_PREVIOUS_PLAYER = 'SET_PREVIOUS_PLAYER',
  UPDATE_OTHER_PLAYERS = 'UPDATE_OTHER_PLAYERS',
  UPDATE_OTHER_PLAYERS_CARDS = 'UPDATE_OTHER_PLAYERS_CARDS',
}

type ActionTypeKeys = keyof typeof ActionType;

interface Action {
  type: ActionTypeKeys;
  activePlayerUuid?: string;
  gameWinner?: Player;
  hand?: Card[];
  player?: Player;
  playersCard?: Record<string, Card[]>;
  previousPlayer?: Player;
  otherPlayers?: Player[];
  roundWinner?: Player;
  yanivCaller?: Player;
}

export const initialState = {
  activePlayerUuid: '',
  gameWinner: null,
  player: null,
  otherPlayers: [],
  previousPlayer: null,
  roundWinner: null,
  yanivCaller: null,
};

const getPlayerWithHand = (playersCard: Record<string, Card[]>, player: Player) => ({
  ...player,
  hand: playersCard[player.uuid],
});

const playersReducer = (state: any, action: Action) => {
  if (action.type === 'END_OF_ROUND_UPDATE') {
    return {
      ...state,
      activePlayerUuid: action.activePlayerUuid,
      roundWinner: action.roundWinner,
      yanivCaller: action.yanivCaller,
    };
  }

  if (action.type === 'SET_ACTIVE_PLAYER') {
    return {
      ...state,
      activePlayerUuid: action.activePlayerUuid,
    };
  }

  if (action.type === 'SET_GAME_WINNER') {
    return {
      ...state,
      gameWinner: action.gameWinner,
    };
  }

  if (action.type === 'SET_ROUND_WINNER') {
    return {
      ...state,
      roundWinner: action.roundWinner,
    };
  }

  if (action.type === 'SET_PLAYER') {
    return {
      ...state,
      player: action.player,
    };
  }

  if (action.type === 'SET_PLAYER_HAND') {
    return {
      ...state,
      player: {
        ...state.player,
        hand: action.hand,
      },
    };
  }

  if (action.type === 'SET_PREVIOUS_PLAYER') {
    return {
      ...state,
      previousPlayer: action.previousPlayer,
    };
  }

  if (action.type === 'UPDATE_OTHER_PLAYERS') {
    return {
      ...state,
      otherPlayers: action.otherPlayers,
    };
  }

  if (action.type === 'UPDATE_OTHER_PLAYERS_CARDS') {
    const otherPlayersWithHand = state.otherPlayers.map((player: Player) =>
      getPlayerWithHand(action.playersCard!, player),
    );

    return { ...state, otherPlayers: otherPlayersWithHand };
  }
};

export default playersReducer;
