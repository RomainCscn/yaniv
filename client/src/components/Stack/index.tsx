import React from 'react';

import GenericCard from '../GenericCard';

import styles from './styles.module.css';

interface StackProps {
  canPlay: boolean;
  pickCard: () => void;
}

const Stack = ({ canPlay, pickCard }: StackProps) => (
  <div className={styles.stackContainer}>
    <GenericCard canClick={false} cardType={'false'} degree={10} />
    <GenericCard canClick={false} cardType={'false'} degree={20} />
    <GenericCard canClick={canPlay} cardType={'stack'} onCardClick={() => pickCard()} />
  </div>
);

export default Stack;
