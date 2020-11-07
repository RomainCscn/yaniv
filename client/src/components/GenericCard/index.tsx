import React from 'react';
import classnames from 'classnames';

import { BACK } from '../../constants';
import { getCardUniqueIndex, getCardImagePath } from '../../core/utils';
import { Card } from '../../types';

import styles from './styles.module.css';

interface GenericCardProps {
  card?: Card;
  canClick: boolean;
  cardType?: 'base' | 'otherPlayer';
  isSelected?: boolean;
  onCardClick?: (() => void) | ((e: React.MouseEvent) => void);
}

const GenericCard = ({
  canClick,
  card,
  cardType = 'base',
  isSelected,
  onCardClick,
}: GenericCardProps) => (
  <img
    className={classnames({
      [styles[`${cardType}Card`]]: true,
      [styles.pointer]: canClick,
      [styles.selected]: isSelected,
    })}
    alt={card ? `card-${getCardUniqueIndex(card)}` : 'stack'}
    onClick={canClick ? onCardClick : undefined}
    onContextMenu={canClick ? onCardClick : undefined}
    src={card ? getCardImagePath(card) : BACK}
  />
);

export default GenericCard;
