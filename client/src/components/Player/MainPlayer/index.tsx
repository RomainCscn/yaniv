import React from 'react';

import CardComponent from './HandCard';
import ActualScore from '../Score/ActualScore';
import HandScore from '../Score/HandScore';
import Avatar from '../../Avatar/AvatarImage';
import MamixtaButton from '../../MamixtaButton';
import { send } from '../../../core/client';
import { getCardUniqueIndex } from '../../../core/utils';
import { Card, Player } from '../../../types';

import styles from './styles.module.css';

interface PlayerHandProps {
  canPlay: boolean;
  hand: Card[];
  player: Player;
  quickPlayDone: boolean;
  roomId: string;
  score: number;
  selectCard: any;
  selectedCards: Card[];
  thrownCards: Card[];
}

const getCardValue = (card: Card): number => (card.value <= 10 ? card.value : 10);

const PlayerHand = ({
  canPlay,
  hand,
  player,
  quickPlayDone,
  roomId,
  score,
  selectCard,
  selectedCards,
  thrownCards,
}: PlayerHandProps) => {
  let sameValueCard: Card[] = [];
  const handScore = hand.reduce((sum, card) => (sum += getCardValue(card)), 0);

  const isPair = thrownCards.length === 2;
  const uniqueValues = [...new Set(thrownCards.map((c) => c.value))].length === 1;
  const isThreeCardsOfSameValue = thrownCards.length === 3 && uniqueValues;

  if (!quickPlayDone && hand.length > 1 && (isPair || isThreeCardsOfSameValue)) {
    sameValueCard = hand.filter((card) => card.value === thrownCards[0].value);
  }

  const quickPlay = (card: Card) => {
    send(
      roomId,
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
        <div className={styles.button}>
          <MamixtaButton hand={hand} canClick={canPlay} roomId={roomId} />
        </div>
      </div>
      <div className={styles.scoreContainer}>
        <div className={styles.avatarContainer}>
          <Avatar id={player.avatar} />
          {player.username}
        </div>
        <ActualScore score={score} />
        <HandScore score={handScore} />
      </div>
    </div>
  );
};

export default PlayerHand;
