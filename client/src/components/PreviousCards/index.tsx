import React from 'react';

import PreviousCard from './PreviousCard';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

interface PreviousCardsProps {
  canPlay: boolean;
  hasDrop: boolean;
  previousCards: Card[];
  pickCard: (card?: Card) => void;
}

const PreviousCards = ({ canPlay, hasDrop, pickCard, previousCards }: PreviousCardsProps) => {
  return (
    <div style={{ marginRight: '128px' }}>
      {previousCards.map((card: Card, index) => (
        <PreviousCard
          canPlay={canPlay}
          key={getCardUniqueIndex(card)}
          hasDrop={hasDrop}
          card={card}
          pickCard={(index === 0 || index === previousCards.length - 1) && pickCard}
        />
      ))}
    </div>
  );
};

export default PreviousCards;
