import React from 'react';

import { send } from '../../core/client';
import { Card } from '../../types';

import styles from './styles.module.css';

interface MamixtaButtonProps {
  hand: Card[];
  hasDrop: boolean;
  roomName: string;
}

const MIN_VALUE_TO_SUBMIT = 100;

const getCardValue = (card: Card) => (card.value <= 10 ? card.value : 10);

const canSubmitMamixta = (hand: Card[], hasDrop: boolean): boolean => {
  const handSum = hand.reduce((sum: number, card) => {
    return sum + getCardValue(card);
  }, 0);

  return !hasDrop && handSum <= MIN_VALUE_TO_SUBMIT;
};

const MamixtaButton = ({ hand, hasDrop, roomName }: MamixtaButtonProps) => {
  const submit = () => {
    const canSubmit = canSubmitMamixta(hand, hasDrop);

    if (canSubmit) {
      send(roomName, { action: 'PLAY', actionType: 'MAMIXTA' });
    } else {
      console.log('Nope');
    }
  };

  return (
    <button className={styles.button} onClick={submit}>
      MAMIXTA
    </button>
  );
};

export default MamixtaButton;
