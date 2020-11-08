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
  isLast?: boolean;
  isSelected?: boolean;
  onCardClick?: (() => void) | ((e: React.MouseEvent) => void);
  onCardDoubleClick?: (() => void) | ((e: React.MouseEvent) => void);
}

const GenericCard = ({
  canClick,
  card,
  cardType = 'base',
  isLast,
  isSelected,
  onCardClick,
  onCardDoubleClick,
}: GenericCardProps) => (
  <img
    className={classnames({
      // @ts-ignore
      [styles[`${cardType}Card`]]: true,
      [styles.pointer]: canClick,
      [styles.selected]: isSelected,
      [styles.last]: isLast,
    })}
    alt={card ? `card-${getCardUniqueIndex(card)}` : 'stack'}
    onClick={canClick ? onCardClick : undefined}
    onDoubleClick={canClick ? onCardDoubleClick : undefined}
    src={card ? getCardImagePath(card) : BACK}
  />
);

export default GenericCard;
