import React, { useCallback } from 'react';

import CardComponent from './HandCard';
import ActualScore from '../Score/ActualScore';
import HandScore from '../Score/HandScore';
import Avatar from '../../Avatar/AvatarImage';
import YanivButton from '../../YanivButton';
import { send } from '../../../core/client';
import { getCardUniqueIndex } from '../../../core/utils';
import { Card, Player } from '../../../types';

import styles from './styles.module.css';

interface PlayerHandProps {
  canPlay: boolean;
  hand: Card[];
  newCard?: { card: Card; isFromStack: boolean };
  player: Player;
  quickPlayDone: boolean;
  resetSelectedCards: () => void;
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
  newCard,
  player,
  quickPlayDone,
  resetSelectedCards,
  roomId,
  score,
  selectCard,
  selectedCards,
  thrownCards,
}: PlayerHandProps) => {
  const handScore = hand.reduce((sum, card) => (sum += getCardValue(card)), 0);
  console.log({ newCard });
  const canQuickPlay = useCallback(
    (card: Card) => {
      let sameValueCards: Card[] = [];
      const uniqueValues = [...new Set(thrownCards.map((c) => c.value))].length === 1;

      const isSingleCard = thrownCards.length === 1;
      const isPair = thrownCards.length === 2;
      const isThreeCardsOfSameValue = thrownCards.length === 3 && uniqueValues;

      if (!quickPlayDone && hand.length > 1 && (isPair || isThreeCardsOfSameValue)) {
        sameValueCards = hand.filter((card) => card.value === thrownCards[0].value);
      }

      const isNewCardFromStack =
        !!newCard &&
        newCard.isFromStack &&
        card.suit === newCard.card.suit &&
        card.value === newCard.card.value;

      const canDropNewCard =
        isNewCardFromStack &&
        (isSingleCard || isPair || isThreeCardsOfSameValue) &&
        card.value === thrownCards[0].value;

      const cardIsSameValueAsThrownsOne =
        sameValueCards.findIndex((c) => card.suit === c.suit && card.value === c.value) !== -1;

      return canDropNewCard || cardIsSameValueAsThrownsOne;
    },
    [hand, newCard, quickPlayDone, thrownCards],
  );

  const quickPlay = (card: Card) => {
    resetSelectedCards();
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
            key={getCardUniqueIndex(card) + index}
            canPlay={canPlay}
            canQuickPlay={canQuickPlay(card)}
            card={card}
            isLast={index === hand.length - 1}
            isNew={
              !!newCard && card.suit === newCard.card.suit && card.value === newCard.card.value
            }
            quickPlay={quickPlay}
            selectCard={selectCard}
            selectedCards={selectedCards}
          />
        ))}
        <div className={styles.button}>
          <YanivButton hand={hand} canClick={canPlay} roomId={roomId} />
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
      {canPlay && <div className={styles.activePlayer}></div>}
    </div>
  );
};

export default PlayerHand;
