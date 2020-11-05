import React, { useEffect, useState, useReducer } from 'react';

import ActiveCards from '../ActiveCards';
import Deck from '../Deck';
import MamixtaButton from '../MamixtaButton';
import PreviousCards from '../PreviousCards';
import Stack from '../Stack';
import reducer from '../../reducers';
import { Card, ReceivedMessage } from '../../types';
import { send } from '../../utils';

interface RoomProps {
  client: WebSocket;
  roomName: string;
  username: string;
}

const Room = ({ client, roomName, username }: RoomProps) => {
  const [state, dispatch] = useReducer(reducer, {
    activeCards: [],
    otherPlayers: {},
    previousCards: [],
    selectedCards: [],
  });
  const [hand, setHand] = useState<Card[]>([]);
  const [hasDrop, setHasDrop] = useState(false);

  useEffect(() => {
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
  }, [client, roomName, username]);

  const pickCard = (card?: Card) => {
    setHasDrop(false);
    send(client, roomName, { action: 'PLAY', actionType: 'PICK' }, { card });
  };

  const resetSelectedCards = () => {
    dispatch({ type: 'resetSelectedCards' });
  };

  const selectCard = (card: Card) => {
    dispatch({ type: 'selectCard', payload: card });
  };

  return (
    <>
      <PreviousCards hasDrop={hasDrop} pickCard={pickCard} previousCards={state.previousCards} />
      <ActiveCards activeCards={state.activeCards} />
      <Stack hasDrop={hasDrop} pickCard={pickCard} />
      <div>
        <Deck
          client={client}
          hand={hand}
          hasDrop={hasDrop}
          resetSelectedCards={resetSelectedCards}
          roomName={roomName}
          setHasDrop={setHasDrop}
          selectCard={selectCard}
          selectedCards={state.selectedCards}
        />
      </div>
      <div>
        <MamixtaButton client={client} hand={hand} roomName={roomName} />
      </div>
    </>
  );
};

export default Room;
