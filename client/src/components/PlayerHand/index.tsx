import React from 'react';
import classnames from 'classnames';

import { ReactComponent as CardsIcons } from '../../assets/cards-diamonds.svg';
import { ReactComponent as TrophyIcons } from '../../assets/trophy.svg';

import CardComponent from './HandCard';
import MamixtaButton from '../MamixtaButton';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

import styles from './styles.module.css';

interface PlayerHandProps {
  canPlay: boolean;
  hand: Card[];
  roomName: string;
  score: number;
  selectCard: any;
  selectedCards: Card[];
}

const PlayerHand = ({
  canPlay,
  hand,
  roomName,
  score,
  selectCard,
  selectedCards,
}: PlayerHandProps) => {
  const handScore = hand.reduce((sum, card) => (sum += card.value), 0);

  return (
    <div className={styles.deckContainer}>
      <div>
        {hand.map((card, index) => (
          <CardComponent
            key={getCardUniqueIndex(card)}
            canPlay={canPlay}
            card={card}
            isLast={index === hand.length - 1}
            selectCard={selectCard}
            selectedCards={selectedCards}
          />
        ))}
        <div className={styles.scoreContainer}>
          <div className={styles.score}>
            <TrophyIcons style={{ marginLeft: '-2px' }} fill={'#2c7a7b'} height={31} />
            {score}
          </div>
          <MamixtaButton hand={hand} canClick={canPlay} roomName={roomName} />
          <div className={classnames(styles.score, styles.handScore)}>
            <CardsIcons fill={'#4c51bf'} /> {handScore}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHand;
