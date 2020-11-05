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
      {previousCards.map((card: Card, index) => {
        const lastCardIndex = previousCards.length - 1;
        console.log({ lastCardIndex, index });

        return (
          <CardComponent
            key={getCardUniqueIndex(card)}
            hasDrop={hasDrop}
            isPrevious
            card={card}
            pickCard={(index === 0 || index === lastCardIndex) && pickCard}
          />
        );
      })}
    </>
  );
};

export default PreviousCards;
