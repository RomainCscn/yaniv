import React from 'react';

import { Card } from '../../types';
import { send } from '../../utils';

import styles from './styles.module.css';

interface MamixtaButtonProps {
  client: WebSocket;
  hand: Card[];
  roomName: string;
}

const MIN_VALUE_TO_SUBMIT = 7;

const getCardValue = (card: Card) => (card.value <= 10 ? card.value : 10);

const canSubmitMamixta = (hand: Card[]): boolean => {
  const handSum = hand.reduce((sum: number, card) => {
    return sum + getCardValue(card);
  }, 0);

  return handSum <= MIN_VALUE_TO_SUBMIT;
};

const MamixtaButton = ({ client, hand, roomName }: MamixtaButtonProps) => {
  const submit = () => {
    const canSubmit = canSubmitMamixta(hand);

    if (canSubmit) {
      send(client, roomName, { action: 'PLAY', actionType: 'MAMIXTA' });
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
