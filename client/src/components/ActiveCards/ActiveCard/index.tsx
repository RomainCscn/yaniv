import React from 'react';

import { Card } from '../../../types';
import { getCardImagePath } from '../../../core/utils';

interface CardProps {
  card: Card;
}

const CardComponent = ({ card }: CardProps) => {
  return (
    <img
      style={{
        border: '1px solid black',
        margin: '6px -82px 6px 0',
        borderRadius: '8px',
      }}
      width='150'
      height='208'
      alt=''
      src={getCardImagePath(card)}
    />
  );
};

export default CardComponent;
