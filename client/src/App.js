import { useEffect, useState, useReducer } from 'react';

import Card from './Card';
import './App.css';

const reducer = (state, action) => {
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
    const selectedCards = [...state.selectedCards];
    const selectedCardIndex = state.selectedCards.findIndex(
      (c) => action.payload.value === c.value && action.payload.suit === c.suit
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

const client = new WebSocket('ws://localhost:8999/');

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    activeCard: null,
    previousCards: [],
    selectedCards: [],
  });
  const [hand, setHand] = useState([]);
  const [hasDrop, setHasDrop] = useState(false);

  useEffect(() => {
    client.onopen = () => {
      client.send(
        JSON.stringify({ action: 'JOIN', room: 'coucou', message: 'test' })
      );
    };

    client.onmessage = (message) => {
      const { activeCard, hand: userHand, previousCards } = JSON.parse(
        message.data
      );

      if (userHand) {
        setHand(userHand);
      } else if (activeCard) {
        dispatch({ type: 'setPreviousCards' });
        dispatch({ type: 'setActiveCard', payload: activeCard });
      } else if (previousCards) {
        console.log(previousCards);
        dispatch({ type: 'setPreviousCards', payload: previousCards });
      }
    };
  }, []);

  const dropCard = (card) => {
    setHasDrop(true);
    if (state.selectedCards.length > 0) {
      client.send(
        JSON.stringify({
          action: 'PLAY',
          type: 'DROP',
          cards: state.selectedCards,
          room: 'coucou',
        })
      );
    } else {
      client.send(
        JSON.stringify({ action: 'PLAY', type: 'DROP', card, room: 'coucou' })
      );
    }

    dispatch({ type: 'resetSelectedCards' });
  };

  const pickCard = (card) => {
    setHasDrop(false);
    client.send(
      JSON.stringify({ action: 'PLAY', type: 'PICK', card, room: 'coucou' })
    );
  };

  const selectCard = (card) => {
    dispatch({ type: 'selectCard', payload: card });
  };

  return (
    <div>
      {state.previousCards &&
        state.previousCards.map((card) => (
          <Card hasDrop={hasDrop} isPrevious card={card} pickCard={pickCard} />
        ))}
      {state.activeCard && <Card isActive card={state.activeCard} />}
      <Card hasDrop={hasDrop} pickCard={pickCard} isStack />
      <br />
      {hand.map((card) => (
        <Card
          hasDrop={hasDrop}
          card={card}
          dropCard={dropCard}
          selectCard={selectCard}
          selectedCards={state.selectedCards}
        />
      ))}
    </div>
  );
};

export default App;
