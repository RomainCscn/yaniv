import React from 'react';

import { send } from '../../core/client';

import styles from './styles.module.css';

const NextRoundButton = ({ roomId }: { roomId: string }) => {
  const nextRound = () => {
    send(roomId, { action: 'PLAY', actionType: 'NEXT_ROUND' });
  };

  return (
    <button className={styles.button} onClick={nextRound}>
      MANCHE SUIVANTE
    </button>
  );
};

export default NextRoundButton;
