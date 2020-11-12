import React from 'react';
import classnames from 'classnames';

import { MIN_VALUE_TO_SUBMIT } from '../../constants';
import { send } from '../../core/client';
import { Card } from '../../types';

import styles from './styles.module.css';

interface YanivButtonProps {
  canClick: boolean;
  hand: Card[];
  roomId: string;
}

const getCardValue = (card: Card) => (card.value <= 10 ? card.value : 10);

const canSubmitYaniv = (hand: Card[], canClick: boolean): boolean => {
  const handSum = hand.reduce((sum: number, card) => {
    return sum + getCardValue(card);
  }, 0);

  return canClick && handSum <= MIN_VALUE_TO_SUBMIT;
};

const YanivButton = ({ hand, canClick, roomId }: YanivButtonProps) => {
  const canSubmit = canSubmitYaniv(hand, canClick);

  const submit = () => send(roomId, { action: 'PLAY', actionType: 'YANIV' });

  return (
    <button
      className={classnames(styles.button, { [styles.pointer]: canSubmit })}
      onClick={canSubmit ? submit : undefined}
    >
      YANIV
    </button>
  );
};

export default YanivButton;
