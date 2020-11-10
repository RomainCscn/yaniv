import React from 'react';

import OtherPlayerHand from './OtherPlayerHand';
import { Player, PlayerScore } from '../../../types';

import styles from './styles.module.css';

interface OtherPlayersProps {
  activePlayer: string;
  otherPlayers: Player[];
  roundWinner: undefined | Player;
  scores: PlayerScore[];
}

const OtherPlayers = ({ activePlayer, otherPlayers, roundWinner, scores }: OtherPlayersProps) => {
  return (
    <div className={styles.container}>
      {otherPlayers.map(({ avatar, hand, numberOfCards, username, uuid }: Player) => (
        <OtherPlayerHand
          key={username}
          avatar={avatar}
          hand={hand}
          isActivePlayer={uuid === activePlayer}
          numberOfCards={numberOfCards}
          score={scores.find((score) => score.uuid === uuid)?.score || 0}
          username={username}
        />
      ))}
    </div>
  );
};

export default OtherPlayers;
