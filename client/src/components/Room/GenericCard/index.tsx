import React from 'react';

import CardImage from './styles';
import { BACK } from '../../../constants';
import { getCardUniqueIndex, getCardImagePath } from '../../../core/utils';
import { Card } from '../../../types';

const getDataCy = (card?: Card, cardType?: 'false' | 'hand' | 'otherPlayer' | 'stack') => {
  return card ? `${cardType}-card-${getCardUniqueIndex(card)}` : 'stack';
};

interface GenericCardProps {
  card?: Card;
  canClick?: boolean;
  cardType?: 'false' | 'hand' | 'otherPlayer' | 'stack';
  degree?: number;
  isNew?: boolean;
  isLast?: boolean;
  isSelected?: boolean;
  onCardClick?: (() => void) | ((e: React.MouseEvent) => void);
  onCardDoubleClick?: (() => void) | ((e: React.MouseEvent) => void);
}

const GenericCard = ({
  canClick,
  card,
  cardType,
  degree,
  isLast,
  isNew,
  isSelected,
  onCardClick,
  onCardDoubleClick,
}: GenericCardProps) => (
  <CardImage
    data-cy={getDataCy(card, cardType)}
    canClick={canClick}
    cardType={cardType}
    degree={degree}
    isLast={isLast}
    isNew={isNew}
    isSelected={isSelected}
    alt={card ? `card-${getCardUniqueIndex(card)}` : 'stack'}
    onClick={canClick ? onCardClick : undefined}
    onDoubleClick={canClick ? onCardDoubleClick : undefined}
    src={card ? getCardImagePath(card) : BACK}
  />
);

export default GenericCard;
