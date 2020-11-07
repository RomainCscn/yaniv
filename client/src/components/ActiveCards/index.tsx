import React from 'react';

import GenericCard from '../GenericCard';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

import styles from './styles.module.css';

interface ActiveCardsProps {
  activeCards: Card[];
}

const ActiveCards = ({ activeCards }: ActiveCardsProps) => {
  return (
    <div className={styles.activeBoard}>
      <div className={styles.offsetCardMargin}>
        {activeCards.map((card: Card) => (
          <GenericCard key={getCardUniqueIndex(card)} canClick={false} card={card} />
        ))}
      </div>
    </div>
  );
};

export default ActiveCards;
