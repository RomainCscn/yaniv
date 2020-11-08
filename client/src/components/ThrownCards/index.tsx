import React from 'react';

import GenericCard from '../GenericCard';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

import styles from './styles.module.css';

interface ThrownCardsProps {
  canPlay: boolean;
  thrownCards: Card[];
  pickCard: (card?: Card) => void;
}

const ThrownCards = ({ canPlay, pickCard, thrownCards }: ThrownCardsProps) => {
  const onCardClick = (card: Card, isFirstOrLast: boolean) => {
    if (canPlay && isFirstOrLast) {
      pickCard(card);
    }
  };

  return (
    <div className={styles.thrownCardsBoard}>
      {thrownCards.map((card: Card, index) => {
        const isFirstOrLast = index === 0 || index === thrownCards.length - 1;

        return (
          <GenericCard
            key={getCardUniqueIndex(card)}
            canClick={canPlay && isFirstOrLast}
            card={card}
            isLast={index === thrownCards.length - 1}
            onCardClick={() => onCardClick(card, isFirstOrLast)}
          />
        );
      })}
    </div>
  );
};

export default ThrownCards;
