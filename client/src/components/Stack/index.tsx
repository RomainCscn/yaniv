import React from 'react';

import GenericCard from '../GenericCard';

import styles from './styles.module.css';

interface StackProps {
  canPlay: boolean;
  hasDrop: boolean;
  pickCard: () => void;
}

const Stack = ({ canPlay, hasDrop, pickCard }: StackProps) => (
  <div className={styles.stackContainer}>
    <GenericCard canClick={canPlay && hasDrop} onCardClick={() => pickCard()} />
  </div>
);

export default Stack;
