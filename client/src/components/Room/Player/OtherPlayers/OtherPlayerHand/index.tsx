import React from 'react';
import styled, { css } from 'styled-components';

import Dots from '../Dots';
import ActualScore from '../../Score/ActualScore';
import AvatarImage from '../../../../shared/Avatar/AvatarImage';
import GenericCard from '../../../GenericCard';
import { Card } from '../../../../../types';

const Container = styled.div<{ isActivePlayer: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ isActivePlayer }) =>
    !isActivePlayer &&
    css`
      opacity: 0.5;
    `}
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-width: 150px;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div<{ isActivePlayer: boolean }>`
  background: #f0fdf4;
  width: 280px;
  height: 140px;
  border-bottom-left-radius: 280px;
  border-bottom-right-radius: 280px;
  position: absolute;
  z-index: -1;
  border: 2px solid #bbf7d0;
  border-top: none;
  transition: all 0.5s ease-out;

  @media screen and (max-height: 850px) {
    width: 230px;
    height: 120px;
    border-bottom-left-radius: 230px;
    border-bottom-right-radius: 230px;
  }

  ${({ isActivePlayer }) =>
    isActivePlayer
      ? css`
          top: 0;
        `
      : css`
          top: -140px;
        `}
`;

interface OtherPlayerHandProps {
  avatar: string;
  hand?: Card[];
  isActivePlayer: boolean;
  numberOfCards?: number;
  score: number;
  username: string;
}

const OtherPlayerHand = ({
  avatar,
  hand,
  isActivePlayer,
  numberOfCards,
  score,
  username,
}: OtherPlayerHandProps) => {
  return (
    <Container isActivePlayer={isActivePlayer}>
      <BottomContainer>
        <AvatarContainer>
          <AvatarImage id={avatar} isSmall={true} />
          <div>{username}</div>
        </AvatarContainer>
        <ActualScore isOtherPlayer score={score} />
      </BottomContainer>
      <div style={{ position: 'relative' }}>
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
        {isActivePlayer && <Dots />}
      </div>
      <Circle isActivePlayer={isActivePlayer} />
    </Container>
  );
};

export default OtherPlayerHand;
