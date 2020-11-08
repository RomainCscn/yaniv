import React from 'react';

import GenericCard from '../../GenericCard';
import { Card } from '../../../types';

interface CardProps {
  canPlay: boolean;
  card: Card;
  selectCard: (card: Card) => void;
  selectedCards: Card[];
}

const CardComponent = ({ canPlay, card, selectCard, selectedCards }: CardProps) => {
  const isSelected = selectedCards?.some(
    (selectedCard: Card) => selectedCard.value === card!.value && selectedCard.suit === card!.suit,
  );

  const onCardClick = () => {
    if (canPlay) {
      selectCard(card);
    }
  };

  return (
    <GenericCard canClick={canPlay} card={card} onCardClick={onCardClick} isSelected={isSelected} />
  );
};

export default CardComponent;
