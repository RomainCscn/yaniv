import React from 'react';
import styled from 'styled-components';

import Dots from '../Dots';
import ActualScore from '../../Score/ActualScore';
import AvatarImage from '../../../Avatar/AvatarImage';
import GenericCard from '../../../GenericCard';
import { Card } from '../../../../types';

interface OtherPlayerHandProps {
  avatar: string;
  hand?: Card[];
  isActivePlayer: boolean;
  numberOfCards?: number;
  score: number;
  username: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-width: 200px;

  @media screen and (max-height: 850px) {
    min-width: 175px;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PlayerName = styled.div<{ isActive: boolean }>`
  ${({ isActive }) => isActive && 'border-bottom: 3px solid #4fd1c5'}
`;

const OtherPlayerHand = ({
  avatar,
  hand,
  isActivePlayer,
  numberOfCards,
  score,
  username,
}: OtherPlayerHandProps) => {
  return (
    <Container>
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
      <BottomContainer>
        <AvatarContainer>
          <AvatarImage id={avatar} />
          <PlayerName isActive={isActivePlayer}>{username}</PlayerName>
        </AvatarContainer>
        {isActivePlayer && <Dots />}
        <ActualScore isOtherPlayer score={score} />
      </BottomContainer>
    </Container>
  );
};

export default OtherPlayerHand;
