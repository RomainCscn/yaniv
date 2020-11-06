import React from 'react';

interface CardProps {
  canPlay: boolean;
  hasDrop: boolean;
  pickCard: () => void;
}

const BACK = process.env.PUBLIC_URL + 'back.svg';

const CardComponent = ({ canPlay, hasDrop, pickCard }: CardProps) => {
  const onCardClick = () => {
    if (canPlay && hasDrop) {
      pickCard();
    }
  };

  return (
    <img
      style={{
        border: '1px solid transparent',
        margin: '6px',
        borderRadius: '8px',
        cursor: canPlay && hasDrop ? 'pointer' : '',
      }}
      width='150'
      height='208'
      alt=''
      onClick={onCardClick}
      src={BACK}
    />
  );
};

export default CardComponent;
