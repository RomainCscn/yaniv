import React from 'react';

import CardComponent from '../Card';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

interface PreviousCardsProps {
  hasDrop: boolean;
  previousCards: Card[];
  pickCard: (card?: Card) => void;
}

const PreviousCards = ({ hasDrop, pickCard, previousCards }: PreviousCardsProps) => {
  return (
    <>
      {previousCards.map((card: Card) => (
        <CardComponent
          key={getCardUniqueIndex(card)}
          hasDrop={hasDrop}
          isPrevious
          card={card}
          pickCard={pickCard}
        />
      ))}
    </>
  );
};

export default PreviousCards;
