import React, { useState } from 'react';
import classnames from 'classnames';

import AVATARS from '../../Avatar';
import { send } from '../../../core/client';
import { Player } from '../../../types';

import styles from '../styles.module.css';

interface Props {
  players: Player[];
  roomId: string;
  username: string;
}

const Players = ({ players, roomId, username }: Props) => {
  const [error, setError] = useState('');

  const startGame = () => {
    if (players.length >= 2) {
      send(roomId, { action: 'START' });
    } else {
      setError('Un seul joueur dans le salon ! Au moins deux joueurs requis pour jouer.');
    }
  };

  return (
    <div className={styles.playersContainer}>
      <h2 className={classnames(styles.sectionTitle, styles.green)}>Joueurs dans le salon</h2>
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
      <div className={styles.buttonContainer}>
        <button className={styles.playButton} onClick={startGame}>
          Commencer la partie
        </button>
        {error && players.length < 2 && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default Players;
