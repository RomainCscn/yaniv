import React from 'react';

import CardComponent from '../Card';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

interface ActiveCardsProps {
  activeCards: Card[];
}

const ActiveCards = ({ activeCards }: ActiveCardsProps) => {
  return (
    <>
      {activeCards.map((card: Card) => (
        <CardComponent key={getCardUniqueIndex(card)} isActive card={card} />
      ))}
    </>
  );
};

export default ActiveCards;
