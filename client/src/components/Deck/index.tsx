import React from 'react';

import CardComponent from './DeckCard';
import { getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';

import styles from './styles.module.css';

interface DeckProps {
  canPlay: boolean;
  hand: Card[];
  roomName: string;
  selectCard: any;
  selectedCards: Card[];
}

const Deck = ({ canPlay, hand, selectCard, selectedCards }: DeckProps) => (
  <div className={styles.deckContainer}>
    {hand.map((card) => (
      <CardComponent
        canPlay={canPlay}
        key={getCardUniqueIndex(card)}
        card={card}
        selectCard={selectCard}
        selectedCards={selectedCards}
      />
    ))}
  </div>
);

export default Deck;
