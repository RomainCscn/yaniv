import React, { useEffect, useState, useReducer } from 'react';

import ActiveCards from '../ActiveCards';
import Deck from '../Deck';
import MamixtaButton from '../MamixtaButton';
import OtherPlayerDeck from '../OtherPlayerDeck';
import PreviousCards from '../PreviousCards';
import Stack from '../Stack';
import client from '../../core/client';
import reducer from '../../reducers';
import { Card, OtherPlayer, PlayerScore, ReceivedMessage } from '../../types';
import { send } from '../../utils';
import ScoreDashboard from '../ScoreDashboard';

interface RoomProps {
  players: OtherPlayer[];
  roomName: string;
  username: string;
  userUuid: string;
}

const Room = ({ players, roomName, userUuid }: RoomProps) => {
  const [state, dispatch] = useReducer(reducer, {
    activeCards: [],
    otherPlayers: players,
    previousCards: [],
    selectedCards: [],
  });
  const [canPlay, setCanPlay] = useState(false);
  const [hand, setHand] = useState<Card[]>([]);
  const [hasDrop, setHasDrop] = useState(false);
  const [scores, setScores] = useState<PlayerScore[]>([]);

  useEffect(() => {
    send(client, roomName, { action: 'READY_TO_PLAY' });
  }, [roomName]);

  useEffect(() => {
    client.onmessage = (message) => {
      const {
        activeCards,
        hand: userHand,
        players,
        playersCard,
        playersScore,
        previousCards,
        type,
        uuid,
      }: ReceivedMessage = JSON.parse(message.data);

      if (type === 'SET_PLAYER_HAND') {
        setHand(userHand);
      } else if (type === 'SET_ACTIVE_CARDS') {
        dispatch({ type: 'setPreviousCards' });
        dispatch({ type: 'setActiveCards', payload: activeCards });
      } else if (type === 'SET_PREVIOUS_CARDS') {
        dispatch({ type: 'setPreviousCards', payload: previousCards });
      } else if (type === 'SET_OTHER_PLAYERS_CARDS') {
        const otherPlayers = players.filter((player) => player.uuid !== userUuid);
        dispatch({ type: 'setOtherPlayers', payload: otherPlayers });
      } else if (type === 'REVEAL_OTHER_PLAYERS_CARDS') {
        dispatch({ type: 'setOtherPlayersCards', payload: playersCard });
      } else if (type === 'SET_ACTIVE_PLAYER') {
        setCanPlay(uuid === userUuid);
      } else if (type === 'UPDATE_SCORE') {
        setScores(playersScore);
      }
    };
  }, [roomName, userUuid]);

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
      <ScoreDashboard scores={scores} />
      {state.otherPlayers.map(({ hand, numberOfCards, username }: OtherPlayer) => (
        <OtherPlayerDeck
          key={username}
          hand={hand}
          numberOfCards={numberOfCards}
          username={username}
        />
      ))}
      <PreviousCards
        canPlay={canPlay}
        hasDrop={hasDrop}
        pickCard={pickCard}
        previousCards={state.previousCards}
      />
      <ActiveCards activeCards={state.activeCards} />
      <Stack canPlay={canPlay} hasDrop={hasDrop} pickCard={pickCard} />
      <div>
        <Deck
          canPlay={canPlay}
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
        <MamixtaButton hand={hand} hasDrop={hasDrop} roomName={roomName} />
      </div>
    </>
  );
};

export default Room;
