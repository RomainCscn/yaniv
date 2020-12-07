import { useCallback, useEffect, useReducer, useState } from 'react';

import client from '../core/client';
import { getSortedOtherPlayers } from '../core/utils';
import cardReducer from '../reducers/cardReducer';
import chatReducer from '../reducers/chatReducer';
import playersReducer from '../reducers/playersReducer';
import { Card, NewCard, Player, PlayerScore, ReceivedMessage, ReceivedMessageType } from '../types';

export default function useMultiplayer({ playerUuid }: { playerUuid: string }) {
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

  const getHandlers = useCallback(
    (data: ReceivedMessage): { [Key in ReceivedMessageType]?: Function } => ({
      BACK_TO_LOBBY: () => setShouldGoBackToLobby(true),
      END_OF_ROUND_UPDATE: () => {
        const { playersCard, playersScore, roundWinner, yanivCaller } = data;
        setActivePlayer('');
        setCanPlay(false);
        setScores(playersScore);
        setRoundWinner(roundWinner);
        setYanivCaller(yanivCaller);
        playersDispatch({ type: 'UPDATE_OTHER_PLAYERS_CARDS', playersCard });
      },
      GAME_OVER: () => setGameWinner(data.winner),
      NEW_MESSAGE: () => chatDispatch({ type: 'NEW_MESSAGE', payload: data.message }),
      NEW_ROUND: () => {
        cardDispatch({ type: 'newRound' });
        setGameWinner(undefined);
        setPreviousPlayer(undefined);
        setPickedCard(undefined);
        setRoundWinner(undefined);
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
        const { uuid } = data;
        setActivePlayer(uuid);
        setCanPlay(uuid === playerUuid);
      },
      SET_INITIAL_SCORES: () => setScores(data.playersScore),
      SET_PICKED_CARD: () => {
        const { pickedCard, previousPlayer } = data;
        setPreviousPlayer(previousPlayer);
        setPickedCard(pickedCard);
        if (previousPlayer.uuid !== playerUuid) {
          setNewCard(undefined); // reset new card if a card is picked by another player
        }
      },
      SET_PLAYER_HAND: () => {
        const { newCardInHand, hand } = data;
        setHand(hand);
        setNewCard(newCardInHand);
      },
      SET_THROWN_CARDS: () => {
        const { thrownCards } = data;
        setQuickPlayDone(false);
        cardDispatch({ type: 'setThrownCards', payload: thrownCards });
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
