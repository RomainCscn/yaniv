import React from 'react';

import CardComponent from './HandCard';
import ActualScore from '../Score/ActualScore';
import HandScore from '../Score/HandScore';
import MamixtaButton from '../../MamixtaButton';
import { send } from '../../../core/client';
import { getCardUniqueIndex } from '../../../core/utils';
import { Card } from '../../../types';

import styles from './styles.module.css';

interface PlayerHandProps {
  canPlay: boolean;
  hand: Card[];
  quickPlayDone: boolean;
  roomName: string;
  score: number;
  selectCard: any;
  selectedCards: Card[];
  thrownCards: Card[];
}

const PlayerHand = ({
  canPlay,
  hand,
  quickPlayDone,
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

  if (!quickPlayDone && hand.length > 1 && (isPair || isThreeCardsOfSameValue)) {
    sameValueCard = hand.filter((card) => card.value === thrownCards[0].value);
  }

  const quickPlay = (card: Card) => {
    send(
      roomName,
      { action: 'PLAY', actionType: 'QUICK_PLAY' },
      { thrownCards: [...thrownCards, card] },
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.handContainer}>
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
      </div>
      <div className={styles.scoreContainer}>
        <ActualScore score={score} />
        <MamixtaButton hand={hand} canClick={canPlay} roomName={roomName} />
        <HandScore score={handScore} />
      </div>
    </div>
  );
};

export default PlayerHand;
