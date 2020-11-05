import { canSelectCard } from './core/game';
import { findCardIndex } from './core/utils';
import { Card } from './types';

enum ActionType {
  setActiveCards = 'setActiveCards',
  setPreviousCards = 'setPreviousCards',
  selectCard = 'selectCard',
  resetSelectedCards = 'resetSelectedCards',
}

type ActionTypeKeys = keyof typeof ActionType;

interface Action {
  type: ActionTypeKeys;
  payload?: Card | Card[];
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

  return state;
};

export default reducer;
