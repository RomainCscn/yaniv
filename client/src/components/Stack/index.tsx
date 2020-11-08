import React from 'react';

import GenericCard from '../GenericCard';

import styles from './styles.module.css';

interface StackProps {
  canPlay: boolean;
  pickCard: () => void;
}

const Stack = ({ canPlay, pickCard }: StackProps) => (
  <div className={styles.stackContainer}>
    <GenericCard canClick={canPlay} onCardClick={() => pickCard()} />
  </div>
);

export default Stack;
