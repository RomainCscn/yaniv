import React from 'react';

import OtherPlayerCard from '../OtherPlayerCard';

const OtherPlayerDeck = ({ numberOfCards }: { numberOfCards: number }) => {
  return (
    <div>
      {[...Array(numberOfCards).keys()].map((index) => (
        <OtherPlayerCard key={index} />
      ))}
    </div>
  );
};

export default OtherPlayerDeck;
