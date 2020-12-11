import React from 'react';

import { ActivePlayer, AvatarContainer, Container, HandContainer, ScoreContainer } from './styles';
import CardComponent from './HandCard';
import ActualScore from '../Score/ActualScore';
import HandScore from '../Score/HandScore';
import Avatar from '../../../shared/Avatar/AvatarImage';
import YanivButton from '../../YanivButton';
import { send } from '../../../../core/client';
import { getCardValue } from '../../../../core/game';
import { canQuickPlay } from '../../../../core/game/quickPlay';
import { getCardUniqueIndex } from '../../../../core/utils';
import { Card, NewCard, Player } from '../../../../types';

interface Props {
  canPlay: boolean;
  hand?: Card[];
  newCard?: NewCard;
  player: Player;
  quickPlayDone: boolean;
  resetSelectedCards: () => void;
  roomId: string;
  score: number;
  selectCard: any;
  selectedCards: Card[];
  thrownCards: Card[];
}

const MainPlayer = ({
  canPlay,
  hand = [],
  newCard,
  player,
  quickPlayDone,
  resetSelectedCards,
  roomId,
  score,
  selectCard,
  selectedCards,
  thrownCards,
}: Props) => {
  const handScore = hand.reduce((sum, card) => (sum += getCardValue(card)), 0);

  const quickPlay = (card: Card) => {
    resetSelectedCards();
    send(
      roomId,
      { action: 'PLAY', actionType: 'QUICK_PLAY' },
      { cards: { thrownCards: [...thrownCards, card] }, player },
    );
  };

  return (
    <Container>
      <HandContainer data-cy='hand'>
        {hand.map((card, index) => (
          <CardComponent
            key={getCardUniqueIndex(card) + index}
            canPlay={canPlay}
            canQuickPlay={canQuickPlay(thrownCards, quickPlayDone, hand, card, newCard)}
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
      </HandContainer>
      <ScoreContainer>
        <AvatarContainer>
          <Avatar id={player.avatar} />
          {player.username}
        </AvatarContainer>
        <ActualScore score={score} />
        <HandScore score={handScore} />
        <YanivButton hand={hand} canClick={canPlay} player={player} roomId={roomId} />
      </ScoreContainer>
      <ActivePlayer isActivePlayer={canPlay} />
    </Container>
  );
};

export default MainPlayer;
