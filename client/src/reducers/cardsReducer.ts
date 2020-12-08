import { canSelectCard } from '../core/game';
import { findCardIndex } from '../core/utils';
import { Card, NewCard, Player } from '../types';

enum ActionType {
  NEW_ROUND = 'NEW_ROUND',
  RESET_SELECTED_CARDS = 'RESET_SELECTED_CARDS',
  SELECT_CARD = 'SELECT_CARD',
  SET_NEW_CARD = 'SET_NEW_CARD',
  SET_PICKED_CARD = 'SET_PICKED_CARD',
  SET_THROWN_CARDS = 'SET_THROWN_CARDS',
}

type ActionTypeKeys = keyof typeof ActionType;

interface Action {
  type: ActionTypeKeys;
  payload?: Card | Card[] | Player[] | Record<string, Card[]>;
  newCard?: NewCard;
  pickedCard?: Card;
}

export const initialState = {
  newCard: null,
  pickedCard: null,
  selectedCards: [],
  thrownCards: [],
};

const cardsReducer = (state: any, action: Action) => {
  if (action.type === 'SET_THROWN_CARDS') {
    return {
      ...state,
      thrownCards: action.payload,
    };
  }

  if (action.type === 'SET_NEW_CARD') {
    return {
      ...state,
      newCard: action.newCard,
    };
  }

  if (action.type === 'SET_PICKED_CARD') {
    return {
      ...state,
      pickedCard: action.pickedCard,
    };
  }

  if (action.type === 'SELECT_CARD') {
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

  if (action.type === 'RESET_SELECTED_CARDS') {
    return {
      ...state,
      selectedCards: [],
    };
  }

  if (action.type === 'NEW_ROUND') {
    return { ...state, pickedCard: undefined, thrownCards: [], selectedCards: [] };
  }

  return state;
};

export default cardsReducer;
