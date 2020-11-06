import React from 'react';

import { Card } from '../../../types';

const BACK = process.env.PUBLIC_URL + 'back.svg';

const getCardImagePath = (card: Card) =>
  `${process.env.PUBLIC_URL}cards/${card.suit.toUpperCase()}-${card.value}.svg`;

const OtherPlayerCard = ({ card }: { card?: Card }) => (
  <img
    style={{
      border: '1px solid black',
      marginRight: '-6px',
      borderRadius: '8px',
    }}
    width='75'
    height='105'
    alt=''
    src={card ? getCardImagePath(card) : BACK}
  />
);

export default OtherPlayerCard;
