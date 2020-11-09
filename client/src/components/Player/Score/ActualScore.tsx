import React from 'react';
import classnames from 'classnames';

import { ReactComponent as TrophyIcons } from '../../../assets/trophy.svg';

import styles from './styles.module.css';

const Score = ({ isOtherPlayer, score }: { isOtherPlayer?: boolean; score: number }) => {
  return (
    <div className={classnames(styles.score, { [styles.noBorder]: isOtherPlayer })}>
      <TrophyIcons style={{ marginLeft: '-2px' }} fill={'#2c7a7b'} height={31} />
      {score}
    </div>
  );
};

export default Score;
