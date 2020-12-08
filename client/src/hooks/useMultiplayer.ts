import { useCallback, useEffect, useReducer, useState } from 'react';

import client from '../core/client';
import { getSortedOtherPlayers } from '../core/utils';
import cardsReducer, { initialState as initialCardsState } from '../reducers/cardsReducer';
import playersReducer, { initialState as initialPlayersState } from '../reducers/playersReducer';
import { ChatMessage, Player, PlayerScore, ReceivedMessage, ReceivedMessageType } from '../types';

export default function useMultiplayer({ playerUuid }: { playerUuid: string }) {
  const [cardsState, cardsDispatch] = useReducer(cardsReducer, initialCardsState);
  const [playersState, playersDispatch] = useReducer(playersReducer, initialPlayersState);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [canPlay, setCanPlay] = useState(false);
  const [playerQuit, setPlayerQuit] = useState(false);
  const [quickPlayDone, setQuickPlayDone] = useState(false);
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [shouldGoBackToLobby, setShouldGoBackToLobby] = useState<boolean>(false);

  const getHandlers = useCallback(
    (data: ReceivedMessage): { [Key in ReceivedMessageType]?: Function } => {
      const aPlayerQuit = (otherPlayers: Player[]) =>
        playersState.otherPlayers.length !== 0 &&
        playersState.otherPlayers.length !== otherPlayers.length;

      return {
        BACK_TO_LOBBY: () => setShouldGoBackToLobby(true),
        END_OF_ROUND_UPDATE: () => {
          const { playersCard, playersScore, roundWinner, yanivCaller } = data;
          setCanPlay(false);
          setScores(playersScore);
          playersDispatch({
            type: 'END_OF_ROUND_UPDATE',
            activePlayerUuid: '',
            playersCard,
            roundWinner,
            yanivCaller,
          });
        },
        GAME_OVER: () => playersDispatch({ type: 'SET_GAME_WINNER', gameWinner: data.winner }),
        NEW_MESSAGE: () => setMessages((prevMessages) => [...prevMessages, data.message]),
        NEW_ROUND: () => {
          cardsDispatch({ type: 'NEW_ROUND' });
          playersDispatch({ type: 'NEW_ROUND' });
        },
        PLAYER_UPDATE: () => {
          window.localStorage.setItem('player', JSON.stringify(data.player));
          playersDispatch({ type: 'SET_PLAYER', player: data.player });
        },
        PLAYERS_UPDATE: () => {
          const otherPlayers = getSortedOtherPlayers(data.players, playerUuid);

          if (aPlayerQuit(otherPlayers)) {
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
          cardsDispatch({ type: 'SET_PICKED_CARD', pickedCard: data.pickedCard });

          if (data.previousPlayer.uuid !== playerUuid) {
            cardsDispatch({ type: 'SET_NEW_CARD', newCard: undefined }); // reset new card if a card is picked by another player
          }
        },
        SET_PLAYER: () => {
          playersDispatch({ type: 'SET_PLAYER', player: data.player });
        },
        SET_PLAYER_HAND: () => {
          cardsDispatch({ type: 'SET_NEW_CARD', newCard: data.newCardInHand });
          playersDispatch({ type: 'SET_PLAYER_HAND', hand: data.hand });
        },
        SET_THROWN_CARDS: () => {
          setQuickPlayDone(false);
          cardsDispatch({ type: 'SET_THROWN_CARDS', payload: data.thrownCards });
        },
      };
    },
    [playersState.otherPlayers.length, playerUuid],
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
    messages,
    playerQuit,
    playersState,
    quickPlayDone,
    resetOnMessage,
    scores,
    shouldGoBackToLobby,
  };
}
