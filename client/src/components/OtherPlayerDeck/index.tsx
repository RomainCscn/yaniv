import React from 'react';

import GenericCard from '../GenericCard';
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
        ? hand.map((card, index) => (
            <GenericCard canClick={false} key={index} cardType='otherPlayer' card={card} />
          ))
        : [...Array(numberOfCards).keys()].map((index) => (
            <GenericCard canClick={false} cardType='otherPlayer' key={index} />
          ))}
      <div>{username}</div>
    </div>
  );
};

export default OtherPlayerDeck;
