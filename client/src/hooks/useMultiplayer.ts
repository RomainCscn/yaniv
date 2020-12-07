import { useCallback, useEffect, useReducer, useState } from 'react';

import client from '../core/client';
import { getSortedOtherPlayers } from '../core/utils';
import cardReducer from '../reducers/cardReducer';
import chatReducer from '../reducers/chatReducer';
import playersReducer from '../reducers/playersReducer';
import { Card, NewCard, Player, PlayerScore, ReceivedMessage } from '../types';

interface Props {
  playerUuid: string;
}

export default function useMultiplayer({ playerUuid }: Props) {
  const [cardState, cardDispatch] = useReducer(cardReducer, {
    selectedCards: [],
    thrownCards: [],
  });
  const [chatState, chatDispatch] = useReducer(chatReducer, {
    messages: [],
  });
  const [playersState, playersDispatch] = useReducer(playersReducer, {
    player: null,
    otherPlayers: [],
  });
  const [activePlayer, setActivePlayer] = useState<string>('');
  const [canPlay, setCanPlay] = useState(false);
  const [gameWinner, setGameWinner] = useState<Player>();
  const [hand, setHand] = useState<Card[]>([]);
  const [newCard, setNewCard] = useState<NewCard>();
  const [pickedCard, setPickedCard] = useState<Card>();
  const [playerQuit, setPlayerQuit] = useState(false);
  const [previousPlayer, setPreviousPlayer] = useState<Player>();
  const [quickPlayDone, setQuickPlayDone] = useState(false);
  const [roundWinner, setRoundWinner] = useState<Player>();
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [shouldGoBackToLobby, setShouldGoBackToLobby] = useState<boolean>(false);
  const [yanivCaller, setYanivCaller] = useState<Player>();

  useEffect(() => {
    client.onmessage = (message) => {
      const data: ReceivedMessage = JSON.parse(message.data);

      if (data.type === 'BACK_TO_LOBBY') {
        setShouldGoBackToLobby(true);
      } else if (data.type === 'SET_PLAYER_HAND') {
        const { newCardInHand, hand } = data;
        setHand(hand);
        setNewCard(newCardInHand);
      } else if (data.type === 'PLAYER_UPDATE') {
        window.localStorage.setItem('player', JSON.stringify(data.player));
        playersDispatch({ type: 'SET_PLAYER', player: data.player });
      } else if (data.type === 'SET_THROWN_CARDS') {
        const { thrownCards } = data;
        setQuickPlayDone(false);
        cardDispatch({ type: 'setThrownCards', payload: thrownCards });
      } else if (data.type === 'SET_PICKED_CARD') {
        const { pickedCard, previousPlayer } = data;
        setPreviousPlayer(previousPlayer);
        setPickedCard(pickedCard);
        if (previousPlayer.uuid !== playerUuid) {
          setNewCard(undefined); // reset new card if a card is picked by another player
        }
      } else if (data.type === 'PLAYERS_UPDATE') {
        if (!playersState.player) {
          const currentPlayer = data.players.find((p) => p.uuid === playerUuid);
          playersDispatch({ type: 'SET_PLAYER', player: currentPlayer });
        }

        const otherPlayers = getSortedOtherPlayers(data.players, playerUuid);

        if (
          playersState.otherPlayers.length !== 0 &&
          playersState.otherPlayers.length !== otherPlayers.length
        ) {
          setPlayerQuit(true);
        } else {
          setPlayerQuit(false);
          playersDispatch({ type: 'UPDATE_OTHER_PLAYERS', otherPlayers });
        }
      } else if (data.type === 'QUICK_PLAY_DONE') {
        setQuickPlayDone(true);
      } else if (data.type === 'END_OF_ROUND_UPDATE') {
        const { playersCard, playersScore, roundWinner, yanivCaller } = data;
        setActivePlayer('');
        setCanPlay(false);
        setScores(playersScore);
        setRoundWinner(roundWinner);
        setYanivCaller(yanivCaller);
        playersDispatch({ type: 'UPDATE_OTHER_PLAYERS_CARDS', playersCard });
      } else if (data.type === 'SET_INITIAL_SCORES') {
        const { playersScore } = data;
        setScores(playersScore);
      } else if (data.type === 'SET_ACTIVE_PLAYER') {
        const { uuid } = data;
        setActivePlayer(uuid);
        setCanPlay(uuid === playerUuid);
      } else if (data.type === 'NEW_ROUND') {
        cardDispatch({ type: 'newRound' });
        setGameWinner(undefined);
        setPreviousPlayer(undefined);
        setPickedCard(undefined);
        setRoundWinner(undefined);
      } else if (data.type === 'GAME_OVER') {
        const { winner } = data;
        setGameWinner(winner);
      } else if (data.type === 'NEW_MESSAGE') {
        chatDispatch({ type: 'NEW_MESSAGE', payload: data.message });
      }
    };
  }, [playersState.otherPlayers.length, playersState.player, playerUuid]);

  const resetOnMessage = useCallback(() => (client.onmessage = null), []);

  return {
    cardState,
    cardDispatch,
    chatState,
    chatDispatch,
    activePlayer,
    canPlay,
    gameWinner,
    hand,
    newCard,
    pickedCard,
    player: playersState.player,
    playerQuit,
    playersState,
    previousPlayer,
    quickPlayDone,
    resetOnMessage,
    roundWinner,
    scores,
    shouldGoBackToLobby,
    yanivCaller,
  };
}
