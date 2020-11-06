import React from 'react';

import CardComponent from './ActiveCard';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

interface ActiveCardsProps {
  activeCards: Card[];
}

const ActiveCards = ({ activeCards }: ActiveCardsProps) => {
  return (
    <div style={{ marginRight: '128px' }}>
      {activeCards.map((card: Card) => (
        <CardComponent key={getCardUniqueIndex(card)} card={card} />
      ))}
    </div>
  );
};

export default ActiveCards;
