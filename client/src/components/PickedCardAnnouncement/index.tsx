import React from 'react';

import GenericCard from '../GenericCard';
import { Card, Player } from '../../types';

import styles from './styles.module.css';

interface Props {
  pickedCard?: Card;
  previousPlayer: Player;
}

const PickedCardAnnouncement = ({ pickedCard, previousPlayer }: Props) => (
  <div className={styles.container}>
    <div className={styles.text}>{previousPlayer?.username + ' a pioché'}</div>
    <GenericCard canClick={false} card={pickedCard} cardType={'otherPlayer'} />
  </div>
);

export default PickedCardAnnouncement;
