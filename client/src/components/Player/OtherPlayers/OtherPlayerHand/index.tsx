import React from 'react';

import ActualScore from '../../Score/ActualScore';
import AvatarImage from '../../../Avatar/AvatarImage';
import GenericCard from '../../../GenericCard';
import { Card } from '../../../../types';

import styles from './styles.module.css';

interface OtherPlayerHandProps {
  avatar: string;
  hand?: Card[];
  isWinner: boolean;
  numberOfCards?: number;
  score: number;
  username: string;
}

const OtherPlayerHand = ({
  avatar,
  hand,
  isWinner,
  numberOfCards,
  score,
  username,
}: OtherPlayerHandProps) => {
  return (
    <div className={styles.container}>
      <div>
        {hand
          ? hand.map((card, index) => (
              <GenericCard
                key={index}
                canClick={false}
                cardType='otherPlayer'
                card={card}
                isLast={index === hand.length - 1}
              />
            ))
          : [...Array(numberOfCards).keys()].map((index) => (
              <GenericCard
                key={index}
                canClick={false}
                cardType='otherPlayer'
                isLast={index === numberOfCards! - 1}
              />
            ))}
      </div>
      <div className={styles.scoreContainer}>
        <AvatarImage id={avatar} />
        <div>{username}</div>
        <ActualScore isOtherPlayer score={score} />
      </div>
    </div>
  );
};

export default OtherPlayerHand;
