import React from 'react';

import { Card } from '../../../types';
import { getCardImagePath } from '../../../core/utils';

interface CardProps {
  canPlay: boolean;
  card: Card;
  dropCard: (card: Card) => void;
  hasDrop: boolean;
  selectCard: (card: Card) => void;
  selectedCards: Card[];
}

const CardComponent = ({
  canPlay,
  card,
  dropCard,
  hasDrop,
  selectCard,
  selectedCards,
}: CardProps) => {
  const onCardClick = (e: React.MouseEvent) => {
    if (e.type === 'click' && canPlay && !hasDrop) {
      dropCard(card!);
    } else if (e.type === 'contextmenu' && canPlay && !hasDrop) {
      e.preventDefault();
      selectCard(card);
    }
  };

  const isSelected = selectedCards?.some(
    (selectedCard: Card) => selectedCard.value === card!.value && selectedCard.suit === card!.suit,
  );

  const canClick = canPlay && !hasDrop && !!dropCard;

  return (
    <img
      style={{
        border: `${isSelected ? '2px' : '1px'} solid ${isSelected ? 'green' : 'black'}`,
        margin: '6px',
        borderRadius: '8px',
        cursor: canClick ? 'pointer' : '',
      }}
      width='150'
      height='208'
      alt=''
      onClick={onCardClick}
      onContextMenu={onCardClick}
      src={getCardImagePath(card)}
    />
  );
};

export default CardComponent;
