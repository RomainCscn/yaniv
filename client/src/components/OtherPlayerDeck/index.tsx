import React from 'react';
import classnames from 'classnames';

import GenericCard from '../GenericCard';
import { Card } from '../../types';

import styles from './styles.module.css';

interface OtherPlayerDeckProps {
  hand?: Card[];
  isWinner: boolean;
  numberOfCards: number;
  score: number;
  username: string;
}

const OtherPlayerDeck = ({
  hand,
  isWinner,
  numberOfCards,
  score,
  username,
}: OtherPlayerDeckProps) => {
  return (
    <div>
      {hand
        ? hand.map((card, index) => (
            <GenericCard canClick={false} key={index} cardType='otherPlayer' card={card} />
          ))
        : [...Array(numberOfCards).keys()].map((index) => (
            <GenericCard canClick={false} cardType='otherPlayer' key={index} />
          ))}
      <div className={classnames({ [styles.winner]: isWinner })}>
        {username} - {score}
      </div>
    </div>
  );
};

export default OtherPlayerDeck;
