import React, { useEffect, useState, useReducer } from 'react';

import CardComponent from './components/Card';
import Deck from './components/Deck';
import MamixtaButton from './components/MamixtaButton';
import OtherPlayerDeck from './components/OtherPlayerDeck';
import reducer from './reducers';
import { Card } from './types';
import { send } from './utils';

import './App.css';

const client = new WebSocket('ws://localhost:8999/');

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    activeCards: [],
    previousCards: [],
    selectedCards: [],
  });
  const [hand, setHand] = useState([]);
  const [hasDrop, setHasDrop] = useState(false);

  useEffect(() => {
    client.onopen = () => {
      send(client, 'JOIN');
    };

    client.onmessage = (message) => {
      const { activeCards, hand: userHand, previousCards } = JSON.parse(message.data);

      if (userHand) {
        setHand(userHand);
      } else if (activeCards) {
        dispatch({ type: 'setPreviousCards' });
        dispatch({ type: 'setActiveCards', payload: activeCards });
      } else if (previousCards) {
        dispatch({ type: 'setPreviousCards', payload: previousCards });
      }
    };
  }, []);

  const pickCard = (card?: Card) => {
    setHasDrop(false);
    send(client, 'PLAY', 'PICK', { card });
  };

  const resetSelectedCards = () => {
    dispatch({ type: 'resetSelectedCards' });
  };

  const selectCard = (card: Card) => {
    dispatch({ type: 'selectCard', payload: card });
  };

  console.log(state?.previousCards);

  return (
    <div>
      <OtherPlayerDeck numberOfCards={3} />
      <div>{hasDrop && 'Please pick a card'}</div>
      {state?.previousCards.length > 0 &&
        state.previousCards.map((card: Card) => (
          <CardComponent hasDrop={hasDrop} isPrevious card={card} pickCard={pickCard} />
        ))}
      {state.activeCards.map((card: Card) => (
        <CardComponent isActive card={card} />
      ))}
      <CardComponent hasDrop={hasDrop} pickCard={pickCard} isStack />
      <br />
      <Deck
        client={client}
        hand={hand}
        hasDrop={hasDrop}
        resetSelectedCards={resetSelectedCards}
        setHasDrop={setHasDrop}
        selectCard={selectCard}
        selectedCards={state.selectedCards}
      />
      <MamixtaButton client={client} hand={hand} />
    </div>
  );
};

export default App;
