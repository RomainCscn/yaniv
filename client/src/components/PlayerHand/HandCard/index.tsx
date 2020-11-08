import React from 'react';

import GenericCard from '../../GenericCard';
import { Card } from '../../../types';

interface CardProps {
  canPlay: boolean;
  canQuickPlay: boolean;
  card: Card;
  isLast: boolean;
  quickPlay: (card: Card) => void;
  selectCard: (card: Card) => void;
  selectedCards: Card[];
}

const CardComponent = ({
  canPlay,
  canQuickPlay,
  card,
  isLast,
  quickPlay,
  selectCard,
  selectedCards,
}: CardProps) => {
  const isSelected = selectedCards?.some(
    (selectedCard: Card) => selectedCard.value === card!.value && selectedCard.suit === card!.suit,
  );

  const onCardClick = () => {
    if (canPlay) {
      selectCard(card);
    }
  };

  const onCardDoubleClick = () => {
    if (canQuickPlay) {
      quickPlay(card);
      console.log('OK');
    } else {
      console.log('NOT OK');
    }
  };

  return (
    <GenericCard
      canClick={canPlay || canQuickPlay}
      card={card}
      isLast={isLast}
      onCardClick={onCardClick}
      onCardDoubleClick={onCardDoubleClick}
      isSelected={isSelected}
    />
  );
};

export default CardComponent;
