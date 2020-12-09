import { useCallback, useEffect, useReducer, useState } from 'react';

import client from '../core/client';
import { getSortedOtherPlayers } from '../core/utils';
import cardsReducer, { initialState as initialCardsState } from '../reducers/cardsReducer';
import playersReducer, { initialState as initialPlayersState } from '../reducers/playersReducer';
import {
  Card,
  ChatMessage,
  Player,
  PlayerScore,
  ReceivedMessage,
  ReceivedMessageType,
} from '../types';

export default function useMultiplayer({ playerUuid }: { playerUuid: string }) {
  const [cardsState, cardsDispatch] = useReducer(cardsReducer, initialCardsState);
  const [playersState, playersDispatch] = useReducer(playersReducer, initialPlayersState);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [canPlay, setCanPlay] = useState(false);
  const [playerQuit, setPlayerQuit] = useState(false);
  const [quickPlayDone, setQuickPlayDone] = useState(false);
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [shouldGoBackToLobby, setShouldGoBackToLobby] = useState<boolean>(false);

  const aPlayerQuit = useCallback(
    (otherPlayers: Player[]) =>
      playersState.otherPlayers.length !== 0 &&
      playersState.otherPlayers.length !== otherPlayers.length,
    [playersState.otherPlayers.length],
  );

  const endOfRound = ({ playersCard, playersScore, roundWinner, yanivCaller }: ReceivedMessage) => {
    setCanPlay(false);
    setScores(playersScore);
    playersDispatch({ type: 'END_OF_ROUND_UPDATE', playersCard, roundWinner, yanivCaller });
  };

  const newRound = () => {
    cardsDispatch({ type: 'NEW_ROUND' });
    playersDispatch({ type: 'NEW_ROUND' });
  };

  const updatePlayers = useCallback(
    ({ players }: ReceivedMessage, aPlayerQuit: (otherPlayers: Player[]) => boolean) => {
      const otherPlayers = getSortedOtherPlayers(players, playerUuid);

      if (aPlayerQuit(otherPlayers)) {
        setPlayerQuit(true);
      } else {
        setPlayerQuit(false);
        playersDispatch({ type: 'UPDATE_OTHER_PLAYERS', otherPlayers });
      }
    },
    [playerUuid],
  );

  const setActivePlayer = useCallback(
    ({ uuid }: ReceivedMessage) => {
      playersDispatch({ type: 'SET_ACTIVE_PLAYER', activePlayerUuid: uuid });
      setCanPlay(uuid === playerUuid);
    },
    [playerUuid],
  );

  const setPickedCard = useCallback(
    ({ pickedCard, previousPlayer }: ReceivedMessage) => {
      playersDispatch({ type: 'SET_PREVIOUS_PLAYER', previousPlayer: previousPlayer });
      cardsDispatch({ type: 'SET_PICKED_CARD', pickedCard: pickedCard });

      if (previousPlayer.uuid !== playerUuid) {
        cardsDispatch({ type: 'SET_NEW_CARD', newCard: undefined });
      }
    },
    [playerUuid],
  );

  const setPlayerHand = ({ hand, newCardInHand }: ReceivedMessage) => {
    cardsDispatch({ type: 'SET_NEW_CARD', newCard: newCardInHand });
    playersDispatch({ type: 'SET_PLAYER_HAND', hand });
  };

  const setThrownCards = ({ thrownCards }: ReceivedMessage) => {
    setQuickPlayDone(false);
    cardsDispatch({ type: 'SET_THROWN_CARDS', thrownCards });
  };

  const getHandlers = useCallback(
    (data: ReceivedMessage): { [Key in ReceivedMessageType]?: Function } => ({
      BACK_TO_LOBBY: () => setShouldGoBackToLobby(true),
      END_OF_ROUND_UPDATE: () => endOfRound(data),
      GAME_OVER: () => playersDispatch({ type: 'SET_GAME_WINNER', gameWinner: data.winner }),
      NEW_MESSAGE: () => setMessages((prevMessages) => [...prevMessages, data.message]),
      NEW_ROUND: () => newRound(),
      PLAYER_UPDATE: () => playersDispatch({ type: 'SET_PLAYER', player: data.player }),
      PLAYERS_UPDATE: () => updatePlayers(data, aPlayerQuit),
      QUICK_PLAY_DONE: () => setQuickPlayDone(true),
      SET_ACTIVE_PLAYER: () => setActivePlayer(data),
      SET_INITIAL_SCORES: () => setScores(data.playersScore),
      SET_PICKED_CARD: () => setPickedCard(data),
      SET_PLAYER: () => playersDispatch({ type: 'SET_PLAYER', player: data.player }),
      SET_PLAYER_HAND: () => setPlayerHand(data),
      SET_THROWN_CARDS: () => setThrownCards(data),
    }),
    [aPlayerQuit, setActivePlayer, setPickedCard, updatePlayers],
  );

  useEffect(() => {
    client.onmessage = (message) => {
      const data: ReceivedMessage = JSON.parse(message.data);

      const handler = getHandlers(data)[data.type];
      if (handler) handler();
    };
  }, [getHandlers]);

  const resetOnMessage = useCallback(() => (client.onmessage = null), []);

  const resetSelectedCards = () => cardsDispatch({ type: 'RESET_SELECTED_CARDS' });

  const selectCard = (card: Card) => cardsDispatch({ type: 'SELECT_CARD', card });

  return {
    cardsState,
    cardsDispatch,
    resetSelectedCards,
    canPlay,
    messages,
    playerQuit,
    playersState,
    quickPlayDone,
    resetOnMessage,
    selectCard,
    scores,
    shouldGoBackToLobby,
  };
}
