import React from 'react';

import { Card, MessageAction, MessageActionType } from '../../types';

import styles from './styles.module.css';

interface MamixtaButtonProps {
  hand: Card[];
  send: (action: MessageAction, type?: MessageActionType, data?: object) => void;
}

const MIN_VALUE_TO_SUBMIT = 7;

const getCardValue = (card: Card) => (card.value <= 10 ? card.value : 10);

const canSubmitMamixta = (hand: Card[]): boolean => {
  const handSum = hand.reduce((sum: number, card) => {
    return sum + getCardValue(card);
  }, 0);

  return handSum <= MIN_VALUE_TO_SUBMIT;
};

const MamixtaButton = ({ hand, send }: MamixtaButtonProps) => {
  const submit = () => {
    const canSubmit = canSubmitMamixta(hand);

    if (canSubmit) {
      send('PLAY', 'MAMIXTA');
    } else {
      console.log('Plus de 7, MAMIXTA impossible !');
    }
  };

  return (
    <button className={styles.button} onClick={submit}>
      MAMIXTA
    </button>
  );
};

export default MamixtaButton;
