import React from 'react';
import styled from 'styled-components';

import GenericCard from '../GenericCard';
import { getCardUniqueIndex } from '../../../core/utils';
import { Card } from '../../../types';

interface ThrownCardsProps {
  canPlay: boolean;
  thrownCards: Card[];
  pickCard: (card?: Card) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4em;
`;

const ThrownCards = ({ canPlay, pickCard, thrownCards }: ThrownCardsProps) => {
  const onCardClick = (card: Card, isFirstOrLast: boolean) => {
    if (canPlay && isFirstOrLast) {
      pickCard(card);
    }
  };

  return (
    <Container>
      {thrownCards.map((card: Card, index) => {
        const isFirstOrLast = index === 0 || index === thrownCards.length - 1;

        return (
          <GenericCard
            key={getCardUniqueIndex(card)}
            canClick={canPlay && isFirstOrLast}
            card={card}
            isLast={index === thrownCards.length - 1}
            onCardClick={() => onCardClick(card, isFirstOrLast)}
          />
        );
      })}
    </Container>
  );
};

export default ThrownCards;
