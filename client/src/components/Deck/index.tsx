import React from 'react';

import CardComponent from '../Card';
import { canDropCard } from '../../core/game';
import { findCardIndex, getCardUniqueIndex } from '../../core/utils';
import { Card } from '../../types';
import { send } from '../../utils';

interface DeckProps {
  client: WebSocket;
  hand: Card[];
  hasDrop: boolean;
  resetSelectedCards: () => void;
  selectCard: any;
  selectedCards: Card[];
  setHasDrop: any;
}

const Deck = ({
  client,
  hand,
  hasDrop,
  resetSelectedCards,
  selectCard,
  selectedCards,
  setHasDrop,
}: DeckProps) => {
  const dropCard = (card: Card) => {
    const selectedCardIndex = findCardIndex(card, selectedCards);

    const dropMultipleCards =
      selectedCardIndex !== -1 && selectedCards.length >= 1 && canDropCard(selectedCards);

    if (dropMultipleCards) {
      setHasDrop(true);
      resetSelectedCards();
      send(client, 'PLAY', 'DROP', { cards: selectedCards });
    } else if (selectedCards.length === 0) {
      setHasDrop(true);
      resetSelectedCards();
      send(client, 'PLAY', 'DROP', { card });
    }
  };

  return (
    <>
      {hand.map((card) => (
        <CardComponent
          key={getCardUniqueIndex(card)}
          dropCard={dropCard}
          hasDrop={hasDrop}
          card={card}
          selectCard={selectCard}
          selectedCards={selectedCards}
        />
      ))}
    </>
  );
};

export default Deck;
