import React from 'react';

import CardComponent from './DeckCard';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

import styles from './styles.module.css';

interface DeckProps {
  canPlay: boolean;
  hand: Card[];
  roomName: string;
  score: number;
  selectCard: any;
  selectedCards: Card[];
}

const Deck = ({ canPlay, hand, score, selectCard, selectedCards }: DeckProps) => (
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

export default Deck;
