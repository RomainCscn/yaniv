import React, { useEffect, useState, useReducer } from 'react';

import CardComponent from './components/Card';
import './App.css';
import { canDropCard } from './core/game';
import reducer from './reducers';
import { Card } from './types';

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
        dispatch({ type: 'setPreviousCards', payload: previousCards });
      }
    };
  }, []);

  const dropCard = (card: Card) => {
    const selectedCardIndex = state.selectedCards.findIndex(
      (c: Card) => card.value === c.value && card.suit === c.suit
    );

    if (
      selectedCardIndex !== -1 &&
      state.selectedCards.length >= 1 &&
      canDropCard(state.selectedCards)
    ) {
      setHasDrop(true);
      dispatch({ type: 'resetSelectedCards' });
      client.send(
        JSON.stringify({
          action: 'PLAY',
          type: 'DROP',
          cards: state.selectedCards,
          room: 'coucou',
        })
      );
    } else if (state.selectedCards.length === 0) {
      setHasDrop(true);
      dispatch({ type: 'resetSelectedCards' });
      client.send(
        JSON.stringify({ action: 'PLAY', type: 'DROP', card, room: 'coucou' })
      );
    }
  };

  const pickCard = (card?: Card) => {
    setHasDrop(false);
    client.send(
      JSON.stringify({ action: 'PLAY', type: 'PICK', card, room: 'coucou' })
    );
  };

  const selectCard = (card: Card) => {
    dispatch({ type: 'selectCard', payload: card });
  };

  return (
    <div>
      <div>{hasDrop && 'Please pick a card'}</div>
      {state.previousCards &&
        state.previousCards.map((card: Card) => (
          <CardComponent
            hasDrop={hasDrop}
            isPrevious
            card={card}
            pickCard={pickCard}
          />
        ))}
      {state.activeCard && <CardComponent isActive card={state.activeCard} />}
      <CardComponent hasDrop={hasDrop} pickCard={pickCard} isStack />
      <br />
      {hand.map((card) => (
        <CardComponent
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
