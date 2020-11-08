import React from 'react';

import CardComponent from './HandCard';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

import styles from './styles.module.css';

interface PlayerHandProps {
  canPlay: boolean;
  hand: Card[];
  roomName: string;
  score: number;
  selectCard: any;
  selectedCards: Card[];
}

const PlayerHand = ({ canPlay, hand, score, selectCard, selectedCards }: PlayerHandProps) => (
  <div className={styles.deckContainer}>
    <div style={{ marginRight: '82px' }}>
      {hand.map((card) => (
        <CardComponent
          canPlay={canPlay}
          key={getCardUniqueIndex(card)}
          card={card}
          selectCard={selectCard}
          selectedCards={selectedCards}
        />
      ))}
    </div>
    <div className={styles.score}>{score}</div>
  </div>
);

export default PlayerHand;
