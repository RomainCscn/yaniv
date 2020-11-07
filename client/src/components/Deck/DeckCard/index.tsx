import React from 'react';

import GenericCard from '../../GenericCard';
import { Card } from '../../../types';

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
  const canClick = canPlay && !hasDrop && !!dropCard;
  const isSelected = selectedCards?.some(
    (selectedCard: Card) => selectedCard.value === card!.value && selectedCard.suit === card!.suit,
  );

  const onCardClick = (e: React.MouseEvent) => {
    if (e.type === 'click' && canPlay && !hasDrop) {
      dropCard(card!);
    } else if (e.type === 'contextmenu' && canPlay && !hasDrop) {
      e.preventDefault();
      selectCard(card);
    }
  };

  return (
    <GenericCard
      canClick={canClick}
      card={card}
      onCardClick={onCardClick}
      isSelected={isSelected}
    />
  );
};

export default CardComponent;
