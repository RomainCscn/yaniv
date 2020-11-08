import React from 'react';
import classnames from 'classnames';

import { ReactComponent as CardsIcons } from '../../assets/cards-diamonds.svg';
import { ReactComponent as TrophyIcons } from '../../assets/trophy.svg';

import CardComponent from './HandCard';
import MamixtaButton from '../MamixtaButton';
import { send } from '../../core/client';
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
  thrownCards: Card[];
}

const PlayerHand = ({
  canPlay,
  hand,
  roomName,
  score,
  selectCard,
  selectedCards,
  thrownCards,
}: PlayerHandProps) => {
  let sameValueCard: Card[] = [];
  const handScore = hand.reduce((sum, card) => (sum += card.value), 0);

  const isPair = thrownCards.length === 2;
  const uniqueValues = [...new Set(thrownCards.map((c) => c.value))].length === 1;
  const isThreeCardsOfSameValue = thrownCards.length === 3 && uniqueValues;

  if (isPair || isThreeCardsOfSameValue) {
    sameValueCard = hand.filter((card) => card.value === thrownCards[0].value);
  }

  const quickPlay = (card: Card) => {
    send(
      roomName,
      { action: 'PLAY', actionType: 'QUICK_PLAY' },
      { thrownCards: [...thrownCards, card] },
    );
  };

  console.log(sameValueCard);
  return (
    <div className={styles.deckContainer}>
      <div>
        {hand.map((card, index) => (
          <CardComponent
            key={getCardUniqueIndex(card)}
            canPlay={canPlay}
            canQuickPlay={
              sameValueCard.findIndex((c) => card.suit === c.suit && card.value === c.value) !== -1
            }
            card={card}
            isLast={index === hand.length - 1}
            quickPlay={quickPlay}
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
