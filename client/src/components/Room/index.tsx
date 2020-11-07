import React, { useEffect, useState, useReducer } from 'react';

import ActiveCards from '../ActiveCards';
import Deck from '../Deck';
import MamixtaButton from '../MamixtaButton';
import NextRoundButton from '../NextRoundButton';
import OtherPlayerDeck from '../OtherPlayerDeck';
import PlayAgainButton from '../PlayAgainButton';
import PreviousCards from '../PreviousCards';
import Stack from '../Stack';
import client, { send } from '../../core/client';
import reducer from '../../reducers';
import { Card, OtherPlayer, PlayerScore, ReceivedMessage } from '../../types';
import ScoreDashboard from '../ScoreDashboard';

import styles from './styles.module.css';

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
  const [isEndOfRound, setIsEndOfRound] = useState(false);
  const [roundWinner, setRoundWinner] = useState<string>();
  const [gameWinner, setGameWinner] = useState<string>();

  useEffect(() => {
    send(roomName, { action: 'READY_TO_PLAY' });
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
        roundWinner,
        type,
        uuid,
        winner,
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
      } else if (type === 'END_OF_ROUND_UPDATE') {
        setCanPlay(false);
        setIsEndOfRound(true);
        setScores(playersScore);
        setRoundWinner(roundWinner);
        dispatch({ type: 'setOtherPlayersCards', payload: playersCard });
      } else if (type === 'SET_ACTIVE_PLAYER') {
        setCanPlay(uuid === userUuid);
      } else if (type === 'NEW_ROUND') {
        dispatch({ type: 'newRound' });
        setGameWinner('');
        setIsEndOfRound(false);
      } else if ('GAME_OVER') {
        setGameWinner(winner);
      }
    };
  }, [roomName, userUuid]);

  const pickCard = (card?: Card) => {
    setHasDrop(false);
    send(roomName, { action: 'PLAY', actionType: 'PICK' }, { card });
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
      {state.otherPlayers.map(({ hand, numberOfCards, username, uuid }: OtherPlayer) => (
        <OtherPlayerDeck
          key={username}
          hand={hand}
          isWinner={uuid === roundWinner}
          numberOfCards={numberOfCards}
          username={username}
        />
      ))}
      {!isEndOfRound && (
        <div className={styles.cardsArea}>
          <PreviousCards
            canPlay={canPlay}
            hasDrop={hasDrop}
            pickCard={pickCard}
            previousCards={state.previousCards}
          />
          {state.activeCards.length > 0 && <ActiveCards activeCards={state.activeCards} />}
          <Stack canPlay={canPlay} hasDrop={hasDrop} pickCard={pickCard} />
        </div>
      )}
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
      <div>
        {gameWinner ? (
          <div>
            <div>Gagnant de la partie : {gameWinner} !</div>
            <PlayAgainButton roomName={roomName} />
          </div>
        ) : isEndOfRound ? (
          <div>
            <NextRoundButton roomName={roomName} />
            {roundWinner === userUuid ? 'GAGNÉ' : 'PERDU'}
          </div>
        ) : (
          <MamixtaButton hand={hand} canClick={canPlay && !hasDrop} roomName={roomName} />
        )}
      </div>
    </>
  );
};

export default Room;
