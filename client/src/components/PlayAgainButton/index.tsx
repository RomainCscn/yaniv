import React from 'react';

import { send } from '../../core/client';

import styles from './styles.module.css';

interface PlayAgainButtonProps {
  roomId: string;
}

const PlayAgainButton = ({ roomId }: PlayAgainButtonProps) => (
  <button
    className={styles.button}
    onClick={() => send(roomId, { action: 'PLAY', actionType: 'PLAY_AGAIN' })}
  >
    REJOUER
  </button>
);

export default PlayAgainButton;
