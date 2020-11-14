import React from 'react';
import classnames from 'classnames';

import { ReactComponent as CardsIcons } from '../../../assets/playing-cards.svg';

import styles from './styles.module.css';

const Score = ({ score }: { score: number }) => {
  return (
    <div className={classnames(styles.score, styles.handScore)}>
      <CardsIcons fill={'#4c51bf'} /> {score}
    </div>
  );
};

export default Score;
