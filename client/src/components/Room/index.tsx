import React, { useEffect, useState, useReducer } from 'react';

import NextRoundButton from '../NextRoundButton';
import PlayAgainButton from '../PlayAgainButton';
import MainPlayer from '../Player/MainPlayer';
import OtherPlayers from '../Player/OtherPlayers';
import ThrownCards from '../ThrownCards';
import Stack from '../Stack';
import client, { send } from '../../core/client';
import { canDropCards } from '../../core/game';
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
    otherPlayers: players,
    selectedCards: [],
    thrownCards: [],
  });
  const [canPlay, setCanPlay] = useState(false);
  const [hand, setHand] = useState<Card[]>([]);
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [isEndOfRound, setIsEndOfRound] = useState(false);
  const [roundWinner, setRoundWinner] = useState<string>();
  const [gameWinner, setGameWinner] = useState<string>();
  const [quickPlayDone, setQuickPlayDone] = useState(false);

  useEffect(() => {
    send(roomName, { action: 'READY_TO_PLAY' });
  }, [roomName]);

  useEffect(() => {
    client.onmessage = (message) => {
      const {
        hand: userHand,
        players,
        playersCard,
        playersScore,
        thrownCards,
        roundWinner,
        type,
        uuid,
        winner,
      }: ReceivedMessage = JSON.parse(message.data);

      if (type === 'SET_PLAYER_HAND') {
        setHand(userHand);
      } else if (type === 'SET_THROWN_CARDS') {
        setQuickPlayDone(false);
        dispatch({ type: 'setThrownCards', payload: thrownCards });
      } else if (type === 'SET_OTHER_PLAYERS_CARDS') {
        const otherPlayers = players.filter((player) => player.uuid !== userUuid);
        dispatch({ type: 'setOtherPlayers', payload: otherPlayers });
      } else if (type === 'QUICK_PLAY_DONE') {
        setQuickPlayDone(true);
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
    if (canDropCards(state.selectedCards)) {
      let cards = {};
      if (card && state.thrownCards.length > 1) {
        // remove picked card from the thrown one
        const remainingThrownCards = state.thrownCards.filter(
          (thrownCard: Card) => thrownCard.value !== card.value || thrownCard.suit !== card.suit,
        );

        cards = {
          pickedCard: card,
          notPickedCards: remainingThrownCards,
          thrownCards: state.selectedCards,
        };
      } else {
        cards = {
          ...(card ? { pickedCard: card } : { notPickedCards: state.thrownCards }),
          thrownCards: state.selectedCards,
        };
      }

      dispatch({ type: 'resetSelectedCards' });
      send(roomName, { action: 'PLAY', actionType: 'DROP_AND_PICK' }, { ...cards });
    }
  };

  const selectCard = (card: Card) => {
    dispatch({ type: 'selectCard', payload: card });
  };

  return (
    <div className={styles.mainContainer}>
      <ScoreDashboard scores={scores} />
      <OtherPlayers otherPlayers={state.otherPlayers} roundWinner={roundWinner} scores={scores} />
      {!isEndOfRound && (
        <div className={styles.cardsArea}>
          <ThrownCards
            canPlay={canPlay && state.selectedCards.length > 0}
            pickCard={pickCard}
            thrownCards={state.thrownCards}
          />
          <Stack canPlay={canPlay && state.selectedCards.length > 0} pickCard={pickCard} />
        </div>
      )}
      {gameWinner ? (
        <div>
          <div>Gagnant de la partie : {gameWinner} !</div>
          <PlayAgainButton roomName={roomName} />
        </div>
      ) : (
        isEndOfRound && (
          <div>
            <NextRoundButton roomName={roomName} />
            {roundWinner === userUuid ? 'GAGNÉ' : 'PERDU'}
          </div>
        )
      )}
      <MainPlayer
        canPlay={canPlay}
        hand={hand}
        quickPlayDone={quickPlayDone}
        roomName={roomName}
        score={scores.find((score) => score.uuid === userUuid)?.score || 0}
        selectCard={selectCard}
        selectedCards={state.selectedCards}
        thrownCards={state.thrownCards}
      />
    </div>
  );
};

export default Room;
