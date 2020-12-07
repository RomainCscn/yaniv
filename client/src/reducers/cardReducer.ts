import { canSelectCard } from '../core/game';
import { findCardIndex } from '../core/utils';
import { Card, Player } from '../types';

enum ActionType {
  newRound = 'newRound',
  resetSelectedCards = 'resetSelectedCards',
  selectCard = 'selectCard',
  setThrownCards = 'setThrownCards',
}

type ActionTypeKeys = keyof typeof ActionType;

interface Action {
  type: ActionTypeKeys;
  payload?: Card | Card[] | Player[] | Record<string, Card[]>;
}

const cardReducer = (state: any, action: Action) => {
  if (action.type === 'setThrownCards') {
    return {
      ...state,
      thrownCards: action.payload,
    };
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

  if (action.type === 'newRound') {
    return { ...state, thrownCards: [], selectedCards: [] };
  }

  return state;
};

export default cardReducer;
