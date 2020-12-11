import React from 'react';

import GenericCard from '../../../GenericCard';
import { Card } from '../../../../../types';

interface CardProps {
  canPlay: boolean;
  canQuickPlay?: boolean;
  card: Card;
  isLast: boolean;
  isNew: boolean;
  quickPlay: (card: Card) => void;
  selectCard: (card: Card) => void;
  selectedCards: Card[];
}

const CardComponent = ({
  canPlay,
  canQuickPlay,
  card,
  isLast,
  isNew,
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
    }
  };

  return (
    <GenericCard
      canClick={canPlay || canQuickPlay}
      card={card}
      cardType={'hand'}
      isLast={isLast}
      isNew={isNew}
      onCardClick={onCardClick}
      onCardDoubleClick={onCardDoubleClick}
      isSelected={isSelected}
    />
  );
};

export default CardComponent;
