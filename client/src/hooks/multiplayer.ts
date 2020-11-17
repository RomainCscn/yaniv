import { useEffect, useReducer, useState } from 'react';

import client from '../core/client';
import cardReducer from '../reducers/cardReducer';
import chatReducer from '../reducers/chatReducer';
import { Card, NewCard, Player, PlayerScore, ReceivedMessage, SortOrder } from '../types';

interface Props {
  initialPlayers: Player[];
  userUuid: string;
}

export default function useMultiplayer({ initialPlayers, userUuid }: Props) {
  const [cardState, cardDispatch] = useReducer(cardReducer, {
    otherPlayers: initialPlayers.filter((player) => player.uuid !== userUuid),
    selectedCards: [],
    thrownCards: [],
  });
  const [chatState, chatDispatch] = useReducer(chatReducer, {
    messages: [],
  });
  const [activePlayer, setActivePlayer] = useState<string>('');
  const [canPlay, setCanPlay] = useState(false);
  const [gameWinner, setGameWinner] = useState<Player>();
  const [hand, setHand] = useState<Card[]>([]);
  const [newCard, setNewCard] = useState<NewCard>();
  const [pickedCard, setPickedCard] = useState<Card>();
  const [previousPlayer, setPreviousPlayer] = useState<Player>();
  const [quickPlayDone, setQuickPlayDone] = useState(false);
  const [roundWinner, setRoundWinner] = useState<Player>();
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [yanivCaller, setYanivCaller] = useState<Player>();

  useEffect(() => {
    client.onmessage = (message) => {
      const data: ReceivedMessage = JSON.parse(message.data);

      if (data.type === 'SET_PLAYER_HAND') {
        const { newCardInHand, hand } = data;
        setHand(hand);
        setNewCard(newCardInHand);
      } else if (data.type === 'PLAYER_UPDATE') {
        const { sortOrder } = data;
        setSortOrder(sortOrder);
      } else if (data.type === 'SET_THROWN_CARDS') {
        const { thrownCards } = data;
        setQuickPlayDone(false);
        cardDispatch({ type: 'setThrownCards', payload: thrownCards });
      } else if (data.type === 'SET_PICKED_CARD') {
        const { pickedCard, previousPlayer } = data;
        setPreviousPlayer(previousPlayer);
        setPickedCard(pickedCard);
        if (previousPlayer.uuid !== userUuid) {
          setNewCard(undefined); // reset new card if a card is picked by another player
        }
      } else if (data.type === 'SET_OTHER_PLAYERS_CARDS') {
        const { players } = data;
        const otherPlayers = players.filter((player) => player.uuid !== userUuid);
        cardDispatch({ type: 'setOtherPlayers', payload: otherPlayers });
      } else if (data.type === 'QUICK_PLAY_DONE') {
        setQuickPlayDone(true);
      } else if (data.type === 'END_OF_ROUND_UPDATE') {
        const { playersCard, playersScore, roundWinner, yanivCaller } = data;
        setActivePlayer('');
        setCanPlay(false);
        setScores(playersScore);
        setRoundWinner(roundWinner);
        setYanivCaller(yanivCaller);
        cardDispatch({ type: 'setOtherPlayersCards', payload: playersCard });
      } else if (data.type === 'SET_INTIAL_SCORES') {
        const { playersScore } = data;
        setScores(playersScore);
      } else if (data.type === 'SET_ACTIVE_PLAYER') {
        const { uuid } = data;
        setActivePlayer(uuid);
        setCanPlay(uuid === userUuid);
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
  }, [userUuid]);

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
    previousPlayer,
    quickPlayDone,
    roundWinner,
    scores,
    sortOrder,
    yanivCaller,
  };
}
