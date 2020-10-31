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

  return state;
};

const client = new WebSocket('ws://localhost:8999/');

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    activeCard: null,
    previousCards: [],
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
    client.send(
      JSON.stringify({ action: 'PLAY', type: 'DROP', card, room: 'coucou' })
    );
  };

  const pickCard = (card) => {
    setHasDrop(false);
    client.send(
      JSON.stringify({ action: 'PLAY', type: 'PICK', card, room: 'coucou' })
    );
  };

  return (
    <div>
      {hasDrop.toString()}
      {state.previousCards &&
        state.previousCards.map((card) => (
          <Card canPick={hasDrop} isPrevious card={card} pickCard={pickCard} />
        ))}
      {state.activeCard && <Card isActive card={state.activeCard} />}
      <Card canPick={hasDrop} pickCard={pickCard} isStack />
      <br />
      {hand.map((card) => (
        <Card card={card} dropCard={dropCard} />
      ))}
    </div>
  );
};

export default App;
