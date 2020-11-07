import React from 'react';

import { BACK } from '../../../constants';
import { Card } from '../../../types';
import { getCardImagePath } from '../../../core/utils';

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
