import React from 'react';

import { Card } from '../../../types';

interface CardProps {
  canPlay: boolean;
  card: Card;
  hasDrop: boolean;
  pickCard?: false | ((card?: Card) => void);
}

const getCardImagePath = (card: Card) =>
  `${process.env.PUBLIC_URL}cards/${card.suit.toUpperCase()}-${card.value}.svg`;

const CardComponent = ({ card, canPlay, hasDrop, pickCard }: CardProps) => {
  const onCardClick = () => {
    if (canPlay && hasDrop && pickCard) {
      pickCard(card);
    }
  };

  return (
    <img
      style={{
        border: '1px solid black',
        margin: '6px -82px 6px 0',
        borderRadius: '8px',
        cursor: canPlay && hasDrop && !!pickCard ? 'pointer' : 'default',
      }}
      width='150'
      height='208'
      alt=''
      onClick={onCardClick}
      src={getCardImagePath(card)}
    />
  );
};

export default CardComponent;
