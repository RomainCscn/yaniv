import React, { useEffect, useState, useReducer, useMemo } from 'react';

import MainPlayer from '../Player/MainPlayer';
import OtherPlayers from '../Player/OtherPlayers';
import ThrownCards from '../ThrownCards';
import Stack from '../Stack';
import client, { send } from '../../core/client';
import { canDropCards, getCardsAfterPick } from '../../core/game';
import reducer from '../../reducers';
import { Card, Player, PlayerScore, ReceivedMessage } from '../../types';
import ScoreDashboard from '../ScoreDashboard';

import styles from './styles.module.css';
import EndRound from '../EndRound';

interface RoomProps {
  players: Player[];
  roomId: string;
  username: string;
  userUuid: string;
}

const Room = ({ players, roomId, userUuid }: RoomProps) => {
  const [state, dispatch] = useReducer(reducer, {
    otherPlayers: players.filter((player) => player.uuid !== userUuid),
    selectedCards: [],
    thrownCards: [],
  });
  const [activePlayer, setActivePlayer] = useState<string>('');
  const [canPlay, setCanPlay] = useState(false);
  const [hand, setHand] = useState<Card[]>([]);
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [roundWinner, setRoundWinner] = useState<Player>();
  const [gameWinner, setGameWinner] = useState<Player>();
  const [quickPlayDone, setQuickPlayDone] = useState(false);

  const player = useMemo(() => players.find((p) => p.uuid === userUuid), [players, userUuid]);

  useEffect(() => {
    send(roomId, { action: 'READY_TO_PLAY' });
  }, [roomId]);

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
        setActivePlayer('');
        setCanPlay(false);
        setScores(playersScore);
        setRoundWinner(roundWinner);
        dispatch({ type: 'setOtherPlayersCards', payload: playersCard });
      } else if (type === 'SET_INTIAL_SCORES') {
        setScores(playersScore);
      } else if (type === 'SET_ACTIVE_PLAYER') {
        setActivePlayer(uuid);
        setCanPlay(uuid === userUuid);
      } else if (type === 'NEW_ROUND') {
        dispatch({ type: 'newRound' });
        setGameWinner(undefined);
        setRoundWinner(undefined);
      } else if ('GAME_OVER') {
        setGameWinner(winner);
      }
    };
  }, [roomId, userUuid]);

  const resetSelectedCards = () => dispatch({ type: 'resetSelectedCards' });

  const pickCard = (card?: Card) => {
    if (canDropCards(state.selectedCards)) {
      const cards = getCardsAfterPick(card, state.selectedCards, state.thrownCards);

      resetSelectedCards();
      send(roomId, { action: 'PLAY', actionType: 'DROP_AND_PICK' }, { ...cards });
    }
  };

  const selectCard = (card: Card) => {
    dispatch({ type: 'selectCard', payload: card });
  };

  return (
    <div className={styles.mainContainer}>
      <ScoreDashboard scores={scores} />
      <OtherPlayers
        activePlayer={activePlayer}
        otherPlayers={state.otherPlayers}
        roundWinner={roundWinner}
        scores={scores}
      />
      {!roundWinner && (
        <div className={styles.cardsArea}>
          <ThrownCards
            canPlay={canPlay && state.selectedCards.length > 0}
            pickCard={pickCard}
            thrownCards={state.thrownCards}
          />
          <Stack canPlay={canPlay && state.selectedCards.length > 0} pickCard={pickCard} />
        </div>
      )}
      {(gameWinner || roundWinner) && (
        <div className={styles.endRoundContainer}>
          <EndRound
            gameWinner={gameWinner}
            roomId={roomId}
            roundWinner={roundWinner}
            userUuid={userUuid}
          />
        </div>
      )}
      <MainPlayer
        canPlay={canPlay}
        hand={hand}
        quickPlayDone={quickPlayDone}
        player={player!}
        resetSelectedCards={resetSelectedCards}
        roomId={roomId}
        score={scores.find((score) => score.uuid === userUuid)?.score || 0}
        selectCard={selectCard}
        selectedCards={state.selectedCards}
        thrownCards={state.thrownCards}
      />
    </div>
  );
};

export default Room;
