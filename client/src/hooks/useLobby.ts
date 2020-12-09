import { useCallback, useEffect, useState } from 'react';

import useLocalStorage from './useLocalStorage';
import AVATARS from '../components/shared/Avatar';
import client, { send } from '../core/client';
import { Player, ReceivedMessage } from '../types';

const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)][0];
const randomUsername = Math.random().toString(36).substring(7);

const initialPlayer: Player = {
  avatar: randomAvatar,
  sort: { order: 'asc', type: 'suit' },
  username: randomUsername,
  uuid: '',
};

interface Props {
  roomId: string;
}

export default function useLobby({ roomId }: Props) {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [handCardsNumber, setHandCardsNumber] = useState(7);
  const [play, setPlay] = useState<boolean | undefined>(undefined);
  const [player, setPlayer] = useLocalStorage('player', initialPlayer);
  const [players, setPlayers] = useState<Player[]>([]);
  const [scoreLimit, setScoreLimit] = useState(200);

  const handleMessage = useCallback(
    (message: any) => {
      const { configuration, error, playerUuid, players, type }: ReceivedMessage = JSON.parse(
        message.data,
      );

      if (type !== 'JOIN_ONGOING_GAME') setIsLoading(false);

      if (error === 'GAME_ALREADY_STARTED') {
        return setError('GAME_ALREADY_STARTED');
      }

      if (type === 'CONFIGURATION_UPDATE') {
        setHandCardsNumber(configuration.handCardsNumber);
        setScoreLimit(configuration.scoreLimit);
      } else if (type === 'ASSIGN_UUID') {
        setPlayer((prevPlayer: Player) => ({ ...prevPlayer, uuid: playerUuid }));
      } else if (type === 'JOIN_ONGOING_GAME') {
        setPlayers(players);
        setPlay(true);
        setIsLoading(false);
      } else if (type === 'PLAYERS_UPDATE') {
        setPlayers(players);
      } else if (type === 'START_GAME') {
        setPlay(true);
      }
    },
    [setPlayer],
  );

  const sendJoin = useCallback(() => {
    send(roomId, { action: 'JOIN', actionType: 'JOINED_LOBBY' }, { player });
  }, [player, roomId]);

  useEffect(() => {
    if (client.readyState !== WebSocket.OPEN && !client.onopen) {
      client.onopen = () => {
        if (play === undefined) sendJoin(); // useful to handle back to lobby
        client.onmessage = handleMessage;
      };
    } else if (client.readyState === WebSocket.OPEN && !client.onmessage) {
      if (play === undefined) sendJoin();
      client.onmessage = handleMessage;
    }
  }, [handleMessage, play, sendJoin]);

  useEffect(() => {
    if (play === false) {
      send(roomId, { action: 'JOIN', actionType: 'BACK' });
    }
  }, [play, roomId]);

  return {
    error,
    handCardsNumber,
    isLoading,
    play,
    player,
    players,
    scoreLimit,
    setHandCardsNumber,
    setPlay,
    setPlayer,
    setScoreLimit,
  };
}
