import { canSelectCard } from '../core/game';
import { findCardIndex } from '../core/utils';
import { Card, NewCard } from '../types';

enum ActionType {
  NEW_ROUND = 'NEW_ROUND',
  RESET_SELECTED_CARDS = 'RESET_SELECTED_CARDS',
  SELECT_CARD = 'SELECT_CARD',
  SET_NEW_CARD = 'SET_NEW_CARD',
  SET_PICKED_CARD = 'SET_PICKED_CARD',
  SET_THROWN_CARDS = 'SET_THROWN_CARDS',
}

interface Action {
  type: keyof typeof ActionType;
  card?: Card;
  newCard?: NewCard;
  pickedCard?: Card;
  thrownCards?: Card[];
}

export const initialState = {
  newCard: null,
  pickedCard: null,
  selectedCards: [],
  thrownCards: [],
};

const cardsReducer = (state: any, { card, newCard, pickedCard, thrownCards, type }: Action) => {
  if (type === 'RESET_SELECTED_CARDS') {
    return { ...state, selectedCards: [] };
  }

  if (type === 'NEW_ROUND') {
    return { ...state, pickedCard: undefined, thrownCards: [], selectedCards: [] };
  }

  if (type === 'SELECT_CARD') {
    if (!canSelectCard(card!, state.selectedCards)) {
      return state;
    }

    const selectedCardIndex = findCardIndex(card!, state.selectedCards);

    if (selectedCardIndex >= 0) {
      return {
        ...state,
        selectedCards: state.selectedCards.filter(
          (_: Card, index: number) => index !== selectedCardIndex,
        ),
      };
    }

    return { ...state, selectedCards: [...state.selectedCards, card] };
  }

  if (type === 'SET_NEW_CARD') {
    return { ...state, newCard };
  }

  if (type === 'SET_PICKED_CARD') {
    return { ...state, pickedCard };
  }

  if (type === 'SET_THROWN_CARDS') {
    return { ...state, thrownCards };
  }

  return state;
};

export default cardsReducer;
