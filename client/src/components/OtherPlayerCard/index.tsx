import React from 'react';

const BACK = process.env.PUBLIC_URL + 'back.svg';

const OtherPlayerCard = () => {
  return (
    <img
      style={{
        border: '1px solid black',
        marginRight: '-6px',
        borderRadius: '8px',
      }}
      width='75'
      height='105'
      alt=''
      src={BACK}
    />
  );
};

export default OtherPlayerCard;
