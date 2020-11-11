import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Players from './Players';
import Profile from './Profile';
import ShareLink from './ShareLink';
import AVATARS from '../Avatar';
import Room from '../Room';
import client, { send } from '../../core/client';
import { Player, ReceivedMessage } from '../../types';

import styles from './styles.module.css';

const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)][0];
const randomUsername = Math.random().toString(36).substring(7);

const Lobby = () => {
  let { roomId } = useParams() as any;
  const history = useHistory();

  if (!roomId) {
    roomId = Math.random().toString(36).substring(7);
    history.replace('/' + roomId);
  }

  const [play, setPlay] = useState(false);
  const [selectedAvatar, setAvatar] = useState<string>(randomAvatar);
  const [username, setUsername] = useState(randomUsername);
  const [players, setPlayers] = useState<Player[]>([]);
  const [userUuid, setUserUuid] = useState('');

  useEffect(() => {
    client.addEventListener('open', () => {
      send(
        roomId,
        { action: 'JOIN', actionType: 'JOINED_LOBBY' },
        { avatar: selectedAvatar, username },
      );

      client.onmessage = (message) => {
        const { players, type, uuid }: ReceivedMessage = JSON.parse(message.data);

        if (type === 'PLAYERS_UPDATE') {
          setPlayers(players);
        } else if (type === 'START_GAME') {
          setUserUuid(uuid);
          setPlayers(players);
          setPlay(true);
        }
      };
    });
  }, [roomId, selectedAvatar, username]);

  return (
    <div>
      {play ? (
        <Room players={players} roomId={roomId} username={username} userUuid={userUuid} />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>Yaniv</h1>
          <ShareLink />
          <div className={styles.sectionContainer}>
            <Players players={players} roomId={roomId} username={username} />
            <Profile
              roomId={roomId}
              setAvatar={setAvatar}
              setUsername={setUsername}
              selectedAvatar={selectedAvatar}
              username={username}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Lobby;
