import React from 'react';
import classnames from 'classnames';

import { send } from '../../core/client';
import { Card } from '../../types';

import styles from './styles.module.css';

interface MamixtaButtonProps {
  canClick: boolean;
  hand: Card[];
  roomName: string;
}

const MIN_VALUE_TO_SUBMIT = 100;

const getCardValue = (card: Card) => (card.value <= 10 ? card.value : 10);

const canSubmitMamixta = (hand: Card[], canClick: boolean): boolean => {
  const handSum = hand.reduce((sum: number, card) => {
    return sum + getCardValue(card);
  }, 0);

  return canClick && handSum <= MIN_VALUE_TO_SUBMIT;
};

const MamixtaButton = ({ hand, canClick, roomName }: MamixtaButtonProps) => {
  const canSubmit = canSubmitMamixta(hand, canClick);

  const submit = () => send(roomName, { action: 'PLAY', actionType: 'MAMIXTA' });

  return (
    <button
      className={classnames(styles.button, { [styles.pointer]: canSubmit })}
      onClick={canSubmit ? submit : undefined}
    >
      MAMIXTA
    </button>
  );
};

export default MamixtaButton;
