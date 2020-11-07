import { canSelectCard } from './core/game';
import { findCardIndex } from './core/utils';
import { Card, OtherPlayer } from './types';

enum ActionType {
  newRound = 'newRound',
  resetSelectedCards = 'resetSelectedCards',
  selectCard = 'selectCard',
  setActiveCards = 'setActiveCards',
  setOtherPlayers = 'setOtherPlayers',
  setOtherPlayersCards = 'setOtherPlayersCards',
  setPreviousCards = 'setPreviousCards',
}

type ActionTypeKeys = keyof typeof ActionType;

interface Action {
  type: ActionTypeKeys;
  payload?: Card | Card[] | OtherPlayer[] | Record<string, Card[]>;
}

const reducer = (state: any, action: Action) => {
  if (action.type === 'setActiveCards') {
    return { ...state, activeCards: action.payload };
  }

  if (action.type === 'setPreviousCards') {
    if (state.activeCards) {
      return {
        ...state,
        previousCards: action.payload || state.activeCards,
      };
    }
  }

  if (action.type === 'selectCard') {
    const canSelect = canSelectCard(action.payload as Card, state.selectedCards);

    if (!canSelect) {
      return state;
    }

    const selectedCards = [...state.selectedCards];
    const selectedCardIndex = findCardIndex(action.payload as Card, state.selectedCards);

    if (selectedCardIndex >= 0) {
      selectedCards.splice(selectedCardIndex, 1);

      return {
        ...state,
        selectedCards: selectedCards,
      };
    } else {
      return {
        ...state,
        selectedCards: [...state.selectedCards, action.payload],
      };
    }
  }

  if (action.type === 'resetSelectedCards') {
    return {
      ...state,
      selectedCards: [],
    };
  }

  if (action.type === 'setOtherPlayers') {
    return {
      ...state,
      otherPlayers: action.payload,
    };
  }

  if (action.type === 'setOtherPlayersCards') {
    const otherPlayersWithHand = state.otherPlayers.map((player: OtherPlayer) => {
      const otherPlayers = action.payload as Record<string, Card[]>;
      const playerHand = otherPlayers[player.uuid];

      return {
        ...player,
        hand: playerHand,
      };
    });

    return { ...state, otherPlayers: otherPlayersWithHand };
  }

  if (action.type === 'newRound') {
    return { ...state, activeCards: [], previousCards: [], selectedCards: [] };
  }

  return state;
};

export default reducer;
