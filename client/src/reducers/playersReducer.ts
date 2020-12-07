import { Card, Player } from '../types';

enum ActionType {
  SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER',
  SET_GAME_WINNER = 'SET_GAME_WINNER',
  SET_PLAYER = 'SET_PLAYER',
  SET_PLAYER_HAND = 'SET_PLAYER_HAND',
  UPDATE_OTHER_PLAYERS = 'UPDATE_OTHER_PLAYERS',
  UPDATE_OTHER_PLAYERS_CARDS = 'UPDATE_OTHER_PLAYERS_CARDS',
}

type ActionTypeKeys = keyof typeof ActionType;

interface Action {
  type: ActionTypeKeys;
  activePlayerUuid?: string | null;
  gameWinner?: Player | null;
  hand?: Card[];
  player?: Player;
  playersCard?: Record<string, Card[]>;
  otherPlayers?: Player[];
}

const getPlayerWithHand = (playersCard: Record<string, Card[]>, player: Player) => ({
  ...player,
  hand: playersCard[player.uuid],
});

const playersReducer = (state: any, action: Action) => {
  if (action.type === 'SET_ACTIVE_PLAYER') {
    return {
      ...state,
      activePlayer: action.activePlayerUuid,
    };
  }

  if (action.type === 'SET_GAME_WINNER') {
    return {
      ...state,
      gameWinner: action.gameWinner,
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
