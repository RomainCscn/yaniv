import React from 'react';

import OtherPlayerHand from './OtherPlayerHand';
import { OtherPlayer, PlayerScore } from '../../../types';

import styles from './styles.module.css';

interface OtherPlayersProps {
  otherPlayers: OtherPlayer[];
  roundWinner: undefined | string;
  scores: PlayerScore[];
}

const OtherPlayers = ({ otherPlayers, roundWinner, scores }: OtherPlayersProps) => {
  return (
    <div className={styles.container}>
      {otherPlayers.map(({ hand, numberOfCards, username, uuid }: OtherPlayer) => (
        <OtherPlayerHand
          key={username}
          hand={hand}
          isWinner={uuid === roundWinner}
          numberOfCards={numberOfCards}
          score={scores.find((score) => score.uuid === uuid)?.score || 0}
          username={username}
        />
      ))}
    </div>
  );
};

export default OtherPlayers;
