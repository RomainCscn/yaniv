import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

import AVATARS from '../Avatar';
import AvatarList from '../Avatar/AvatarList';
import Room from '../Room';
import client, { send } from '../../core/client';
import { Player, ReceivedMessage } from '../../types';

import styles from './styles.module.css';

const Lobby = () => {
  let { roomId } = useParams() as any;
  const history = useHistory();

  if (!roomId) {
    roomId = Math.random().toString(36).substring(7);
    history.replace('/' + roomId);
  }

  const [error, setError] = useState('');
  const [play, setPlay] = useState(false);
  const [selectedAvatar, setAvatar] = useState<string>(
    AVATARS[Math.floor(Math.random() * AVATARS.length)][0],
  );
  const [username, setUsername] = useState(Math.random().toString(36).substring(7));
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

  const startGame = () => {
    if (players.length >= 2) {
      send(roomId, { action: 'START' });
    } else {
      setError('Un seul joueur dans le salon ! Au moins deux joueurs requis pour jouer.');
    }
  };

  const updatePlayerInformation = () => {
    send(roomId, { action: 'UPDATE' }, { avatar: selectedAvatar, username });
  };

  return (
    <div>
      {play ? (
        <Room players={players} roomId={roomId} username={username} userUuid={userUuid} />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>Yaniv</h1>
          <div>
            <p className={styles.linkText}>
              Partagez ce lien à vos amis pour qu'ils vous rejoignent
            </p>
            <p className={styles.link}>
              <a href={window.location.href}>{window.location.host + window.location.pathname}</a>
            </p>
          </div>
          <div className={styles.sectionContainer}>
            <div className={styles.playersContainer}>
              <h2 className={classnames(styles.sectionTitle, styles.green)}>
                Joueurs dans le salon
              </h2>
              <div className={styles.playersAvatarContainer}>
                {players.map((player) => (
                  <div className={styles.avatarPlayer} key={player.uuid}>
                    <img
                      width={50}
                      src={AVATARS.find((avatar) => avatar[0] === player.avatar)![1]}
                      alt={player.avatar}
                    />
                    <div className={styles.playerName}>
                      {player.username} {player.username === username && '(vous)'}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.playButtonContainer}>
                <button className={styles.playButton} onClick={() => startGame()}>
                  Commencer la partie
                </button>
                {players.length < 2 && error}
              </div>
            </div>
            <div className={styles.userProfileContainer}>
              <h2 className={classnames(styles.sectionTitle, styles.indigo)}>
                Modifier votre profil
              </h2>
              <div style={{ marginBottom: '24px' }}>
                <label className={styles.label}>Nom</label>
                <input
                  className={styles.usernameInput}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AvatarList selectedAvatar={selectedAvatar} setAvatar={setAvatar} />
              </div>
              <button className={styles.updateButton} onClick={updatePlayerInformation}>
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lobby;
