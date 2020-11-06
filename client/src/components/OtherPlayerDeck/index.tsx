import React from 'react';

import OtherPlayerCard from './OtherPlayerCard';
import { Card } from '../../types';

const OtherPlayerDeck = ({
  hand,
  numberOfCards,
  username,
}: {
  hand?: Card[];
  numberOfCards: number;
  username: string;
}) => {
  return (
    <div>
      {hand
        ? hand.map((card, index) => <OtherPlayerCard key={index} card={card} />)
        : [...Array(numberOfCards).keys()].map((index) => <OtherPlayerCard key={index} />)}
      <div>{username}</div>
    </div>
  );
};

export default OtherPlayerDeck;
