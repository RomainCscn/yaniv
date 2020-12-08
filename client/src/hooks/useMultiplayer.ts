import { useCallback, useEffect, useReducer, useState } from 'react';

import client from '../core/client';
import { getSortedOtherPlayers } from '../core/utils';
import cardsReducer, { initialState as initialCardsState } from '../reducers/cardsReducer';
import playersReducer, { initialState } from '../reducers/playersReducer';
import {
  Card,
  ChatMessage,
  NewCard,
  PlayerScore,
  ReceivedMessage,
  ReceivedMessageType,
} from '../types';

export default function useMultiplayer({ playerUuid }: { playerUuid: string }) {
  const [cardsState, cardsDispatch] = useReducer(cardsReducer, initialCardsState);
  const [playersState, playersDispatch] = useReducer(playersReducer, initialState);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [canPlay, setCanPlay] = useState(false);
  const [newCard, setNewCard] = useState<NewCard>();
  const [pickedCard, setPickedCard] = useState<Card>();
  const [playerQuit, setPlayerQuit] = useState(false);
  const [quickPlayDone, setQuickPlayDone] = useState(false);
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [shouldGoBackToLobby, setShouldGoBackToLobby] = useState<boolean>(false);

  const getHandlers = useCallback(
    (data: ReceivedMessage): { [Key in ReceivedMessageType]?: Function } => ({
      BACK_TO_LOBBY: () => setShouldGoBackToLobby(true),
      END_OF_ROUND_UPDATE: () => {
        const { playersCard, playersScore, roundWinner, yanivCaller } = data;
        setCanPlay(false);
        setScores(playersScore);
        playersDispatch({
          type: 'END_OF_ROUND_UPDATE',
          activePlayerUuid: '',
          roundWinner,
          yanivCaller,
        });
        playersDispatch({ type: 'UPDATE_OTHER_PLAYERS_CARDS', playersCard });
      },
      GAME_OVER: () => playersDispatch({ type: 'SET_GAME_WINNER', gameWinner: data.winner }),
      NEW_MESSAGE: () => setMessages((prevMessages) => [...prevMessages, data.message]),
      NEW_ROUND: () => {
        cardsDispatch({ type: 'NEW_ROUND' });
        setPickedCard(undefined);
        playersDispatch({ type: 'SET_GAME_WINNER', gameWinner: undefined });
        playersDispatch({ type: 'SET_PREVIOUS_PLAYER', previousPlayer: undefined });
        playersDispatch({ type: 'SET_ROUND_WINNER', roundWinner: undefined });
      },
      PLAYER_UPDATE: () => {
        window.localStorage.setItem('player', JSON.stringify(data.player));
        playersDispatch({ type: 'SET_PLAYER', player: data.player });
      },
      PLAYERS_UPDATE: () => {
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
      },
      QUICK_PLAY_DONE: () => setQuickPlayDone(true),
      SET_ACTIVE_PLAYER: () => {
        playersDispatch({ type: 'SET_ACTIVE_PLAYER', activePlayerUuid: data.uuid });
        setCanPlay(data.uuid === playerUuid);
      },
      SET_INITIAL_SCORES: () => setScores(data.playersScore),
      SET_PICKED_CARD: () => {
        playersDispatch({ type: 'SET_PREVIOUS_PLAYER', previousPlayer: data.previousPlayer });
        setPickedCard(data.pickedCard);
        if (data.previousPlayer.uuid !== playerUuid) {
          setNewCard(undefined); // reset new card if a card is picked by another player
        }
      },
      SET_PLAYER_HAND: () => {
        playersDispatch({ type: 'SET_PLAYER_HAND', hand: data.hand });
        setNewCard(data.newCardInHand);
      },
      SET_THROWN_CARDS: () => {
        setQuickPlayDone(false);
        cardsDispatch({ type: 'SET_THROWN_CARDS', payload: data.thrownCards });
      },
    }),
    [playersState.otherPlayers.length, playersState.player, playerUuid],
  );

  useEffect(() => {
    client.onmessage = (message) => {
      const data: ReceivedMessage = JSON.parse(message.data);

      const handler = getHandlers(data)[data.type];
      if (handler) handler();
    };
  }, [getHandlers]);

  const resetOnMessage = useCallback(() => (client.onmessage = null), []);

  return {
    cardsState,
    cardsDispatch,
    canPlay,
    newCard,
    messages,
    pickedCard,
    playerQuit,
    playersState,
    quickPlayDone,
    resetOnMessage,
    scores,
    shouldGoBackToLobby,
  };
}
