import React from 'react';

import { Card } from '../../types'

interface CardProps {
  card?: Card,
  dropCard?: (card: Card) => void,
  hasDrop?: boolean,
  isActive?: boolean,
  isPrevious?: boolean,
  isStack?: boolean,
  pickCard?: (card?: Card) => void,
  selectCard?: (card: Card) => void,
  selectedCards?: Card[]
}

const BACK = process.env.PUBLIC_URL + 'back.svg';

const getCardImagePath = (card: Card) =>
  `${process.env.PUBLIC_URL}cards/${card.suit.toUpperCase()}-${card.value}.svg`;

const CardComponent = ({
  card,
  dropCard,
  hasDrop,
  isActive,
  isPrevious,
  isStack,
  pickCard,
  selectCard,
  selectedCards,
}: CardProps) => {
  const onCardClick = (e: any) => {
    if (e.type === 'click') {
      if (hasDrop && !isActive) {
        if (isStack) {
          pickCard!();
        } else if (isPrevious) {
          pickCard!(card);
        }
      } else if (!hasDrop && dropCard) {
        dropCard(card!);
      }
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
      selectCard!(card!);
    }
  };

  const isSelected = selectedCards?.some(
    (selectedCard: Card) =>
      selectedCard.value === card!.value && selectedCard.suit === card!.suit
  );

  const canClick =
    (!isActive && !hasDrop && dropCard) || (hasDrop && (isStack || isPrevious));

  return (
    <img
      style={{
        border: `${isSelected ? '2px' : '1px'} solid ${
          isStack ? 'transparent' : isSelected ? 'green' : 'black'
        }`,
        margin: '6px',
        borderRadius: '8px',
        cursor: canClick ? 'pointer' : '',
      }}
      width='150'
      height='208'
      alt=''
      onClick={onCardClick}
      onContextMenu={onCardClick}
      src={isStack ? BACK : getCardImagePath(card!)}
    />
  );
};

export default CardComponent;
