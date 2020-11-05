import React, { useEffect, useState, useReducer } from 'react';

import ActiveCards from './components/ActiveCards';
import Deck from './components/Deck';
import MamixtaButton from './components/MamixtaButton';
import OtherPlayerDeck from './components/OtherPlayerDeck';
import PreviousCards from './components/PreviousCards';
import Stack from './components/Stack';
import reducer from './reducers';
import { Card, ReceivedMessage } from './types';
import { send } from './utils';

import './App.css';

const client = new WebSocket('ws://localhost:8999/');

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    activeCards: [],
    otherPlayers: {},
    previousCards: [],
    selectedCards: [],
  });
  const [hand, setHand] = useState<Card[]>([]);
  const [hasDrop, setHasDrop] = useState(false);

  useEffect(() => {
    client.onopen = () => {
      send(client, 'JOIN');
    };

    client.onmessage = (message) => {
      const {
        activeCards,
        hand: userHand,
        player,
        previousCards,
        type,
      }: ReceivedMessage = JSON.parse(message.data);

      if (type === 'SET_PLAYER_HAND') {
        setHand(userHand);
      } else if (type === 'SET_ACTIVE_CARDS') {
        dispatch({ type: 'setPreviousCards' });
        dispatch({ type: 'setActiveCards', payload: activeCards });
      } else if (type === 'SET_PREVIOUS_CARDS') {
        dispatch({ type: 'setPreviousCards', payload: previousCards });
      } else if (type === 'SET_OTHER_PLAYERS_CARDS') {
        console.log(player);
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

  return (
    <div>
      <OtherPlayerDeck numberOfCards={3} />
      <PreviousCards hasDrop={hasDrop} pickCard={pickCard} previousCards={state.previousCards} />
      <ActiveCards activeCards={state.activeCards} />
      <Stack hasDrop={hasDrop} pickCard={pickCard} />
      <div>
        <Deck
          client={client}
          hand={hand}
          hasDrop={hasDrop}
          resetSelectedCards={resetSelectedCards}
          setHasDrop={setHasDrop}
          selectCard={selectCard}
          selectedCards={state.selectedCards}
        />
      </div>
      <div>
        <MamixtaButton client={client} hand={hand} />
      </div>
    </div>
  );
};

export default App;
