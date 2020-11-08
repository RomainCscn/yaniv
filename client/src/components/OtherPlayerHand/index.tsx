import React from 'react';
import classnames from 'classnames';

import GenericCard from '../GenericCard';
import { Card } from '../../types';

import styles from './styles.module.css';

interface OtherPlayerHandProps {
  hand?: Card[];
  isWinner: boolean;
  numberOfCards: number;
  score: number;
  username: string;
}

const OtherPlayerHand = ({
  hand,
  isWinner,
  numberOfCards,
  score,
  username,
}: OtherPlayerHandProps) => {
  return (
    <div>
      {hand
        ? hand.map((card, index) => (
            <GenericCard key={index} canClick={false} cardType='otherPlayer' card={card} />
          ))
        : [...Array(numberOfCards).keys()].map((index) => (
            <GenericCard key={index} canClick={false} cardType='otherPlayer' />
          ))}
      <div className={classnames({ [styles.winner]: isWinner })}>
        {username} - {score}
      </div>
    </div>
  );
};

export default OtherPlayerHand;
