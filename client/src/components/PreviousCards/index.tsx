import React from 'react';

import GenericCard from '../GenericCard';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

import styles from './styles.module.css';

interface PreviousCardsProps {
  canPlay: boolean;
  hasDrop: boolean;
  previousCards: Card[];
  pickCard: (card?: Card) => void;
}

const PreviousCards = ({ canPlay, hasDrop, pickCard, previousCards }: PreviousCardsProps) => {
  const onCardClick = (card: Card, isFirstOrLast: boolean) => {
    if (canPlay && hasDrop && isFirstOrLast) {
      pickCard(card);
    }
  };

  return (
    <div className={styles.previousBoard}>
      {previousCards.map((card: Card, index) => {
        const isFirstOrLast = index === 0 || index === previousCards.length - 1;

        return (
          <GenericCard
            key={getCardUniqueIndex(card)}
            canClick={canPlay && hasDrop && isFirstOrLast}
            card={card}
            onCardClick={() => onCardClick(card, isFirstOrLast)}
          />
        );
      })}
    </div>
  );
};

export default PreviousCards;
