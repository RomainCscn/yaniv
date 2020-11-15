import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import HowToPlay from './HowToPlay';
import Players from './Players';
import Profile from './Profile';
import ShareLink from './ShareLink';
import AVATARS from '../Avatar';
import Room from '../Room';
import client, { send } from '../../core/client';
import { CustomError, Player, ReceivedMessage } from '../../types';

import styles from './styles.module.css';

const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)][0];
const randomUsername = Math.random().toString(36).substring(7);

const initialPlayer: Player = { avatar: randomAvatar, username: randomUsername, uuid: '' };

const Lobby = () => {
  let { roomId } = useParams() as any;
  const history = useHistory();

  const [error, setError] = useState<CustomError>();
  const [play, setPlay] = useState(false);
  const [player, setPlayer] = useState<Player>(initialPlayer);
  const [players, setPlayers] = useState<Player[]>([]);

  if (!roomId) {
    roomId = Math.random().toString(36).substring(7);
    history.replace('/' + roomId);
  }

  const handleMessage = (message: any) => {
    const { error, players, type, uuid }: ReceivedMessage = JSON.parse(message.data);

    if (error === 'GAME_ALREADY_STARTED') {
      return setError(error);
    }

    if (type === 'PLAYERS_UPDATE') {
      setPlayers(players);
    } else if (type === 'START_GAME') {
      setPlayer((prevPlayer) => ({ ...prevPlayer, uuid }));
      setPlayers(players);
      setPlay(true);
    }
  };

  const sendJoin = useCallback(() => {
    send(
      roomId,
      { action: 'JOIN', actionType: 'JOINED_LOBBY' },
      { avatar: player.avatar, username: player.username },
    );
  }, [player, roomId]);

  useEffect(() => {
    if (client.readyState !== client.OPEN) {
      client.addEventListener('open', () => {
        sendJoin();
        client.onmessage = handleMessage;
      });
    } else if (client.onmessage === null) {
      sendJoin();
      client.onmessage = handleMessage;
    }
  }, [sendJoin, roomId]);

  return (
    <>
      {play ? (
        <Room players={players} roomId={roomId} username={player.username} userUuid={player.uuid} />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>Yaniv</h1>
          <ShareLink />
          <div className={styles.sectionContainer}>
            <Players error={error} players={players} roomId={roomId} username={player.username} />
            <Profile player={player} roomId={roomId} setPlayer={setPlayer} />
          </div>
          <HowToPlay />
        </div>
      )}
    </>
  );
};

export default Lobby;
