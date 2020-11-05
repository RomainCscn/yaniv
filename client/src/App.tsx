import React, { useEffect, useState, useReducer } from 'react';

import CardComponent from './components/Card';
import MaxmixtaButton from './components/MamixtaButton';
import { canDropCard } from './core/game';
import { findCardIndex } from './core/utils';
import reducer from './reducers';
import { Card, MessageAction, MessageActionType } from './types';
import './App.css';

const ROOM = 'TEST';
const client = new WebSocket('ws://localhost:8999/');

const send = (action: MessageAction, actionType?: MessageActionType, data?: object) => {
  client.send(JSON.stringify({ action, actionType, room: ROOM, ...data }));
};

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
      send('JOIN');
    };

    client.onmessage = (message) => {
      const { activeCard, hand: userHand, previousCards } = JSON.parse(message.data);

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
    const selectedCardIndex = findCardIndex(card, state.selectedCards);

    const dropMultipleCards =
      selectedCardIndex !== -1 &&
      state.selectedCards.length >= 1 &&
      canDropCard(state.selectedCards);

    if (dropMultipleCards) {
      setHasDrop(true);
      dispatch({ type: 'resetSelectedCards' });
      send('PLAY', 'DROP', { cards: state.selectedCards });
    } else if (state.selectedCards.length === 0) {
      setHasDrop(true);
      dispatch({ type: 'resetSelectedCards' });
      send('PLAY', 'DROP', { card });
    }
  };

  const pickCard = (card?: Card) => {
    setHasDrop(false);
    send('PLAY', 'PICK', { card });
  };

  const selectCard = (card: Card) => {
    dispatch({ type: 'selectCard', payload: card });
  };

  return (
    <div>
      <div>{hasDrop && 'Please pick a card'}</div>
      {state?.previousCards.map((card: Card) => (
        <CardComponent hasDrop={hasDrop} isPrevious card={card} pickCard={pickCard} />
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
      <MaxmixtaButton hand={hand} send={send} />
    </div>
  );
};

export default App;
