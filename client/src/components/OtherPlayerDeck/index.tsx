import React from 'react';

import OtherPlayerCard from '../OtherPlayerCard';

const OtherPlayerDeck = ({
  numberOfCards,
  username,
}: {
  numberOfCards: number;
  username: string;
}) => {
  return (
    <div>
      {[...Array(numberOfCards).keys()].map((index) => (
        <OtherPlayerCard key={index} />
      ))}
      <div>{username}</div>
    </div>
  );
};

export default OtherPlayerDeck;
