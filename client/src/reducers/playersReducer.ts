import { Card, Player } from '../types';

enum ActionType {
  SET_PLAYER = 'SET_PLAYER',
  UPDATE_OTHER_PLAYERS = 'UPDATE_OTHER_PLAYERS',
  UPDATE_OTHER_PLAYERS_CARDS = 'UPDATE_OTHER_PLAYERS_CARDS',
}

type ActionTypeKeys = keyof typeof ActionType;

interface Action {
  type: ActionTypeKeys;
  player?: Player;
  playersCard?: Record<string, Card[]>;
  otherPlayers?: Player[];
}

const getPlayerWithHand = (playersCard: Record<string, Card[]>, player: Player) => ({
  ...player,
  hand: playersCard[player.uuid],
});

const playersReducer = (state: any, action: Action) => {
  if (action.type === 'SET_PLAYER') {
    return {
      ...state,
      player: action.player,
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
