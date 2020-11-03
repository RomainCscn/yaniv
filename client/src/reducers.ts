import { canSelectCard } from './core/game';
import { Card } from './types';

enum ActionType {
  setActiveCard = 'setActiveCard',
  setPreviousCards = 'setPreviousCards',
  selectCard = 'selectCard',
  resetSelectedCards = 'resetSelectedCards',
}

type ActionTypeKeys = keyof typeof ActionType;

interface Action {
  type: ActionTypeKeys;
  payload?: any;
}

const reducer = (state: any, action: Action) => {
  if (action.type === 'setActiveCard') {
    return { ...state, activeCard: action.payload };
  }

  if (action.type === 'setPreviousCards') {
    if (state.activeCard) {
      return {
        ...state,
        previousCards: (action.payload && [action.payload]) || [
          state.activeCard,
        ],
      };
    }
  }

  if (action.type === 'selectCard') {
    const canSelect = canSelectCard(action.payload, state.selectedCards);

    if (!canSelect) {
      return state;
    }

    const selectedCards = [...state.selectedCards];
    const selectedCardIndex = state.selectedCards.findIndex(
      (c: Card) =>
        action.payload.value === c.value && action.payload.suit === c.suit
    );

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
