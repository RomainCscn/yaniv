import React from 'react';
import styled, { css } from 'styled-components';

import Circle from '../Circle';
import Dots from '../Dots';
import YanivText from '../YanivText';
import ActualScore from '../../Score/ActualScore';
import AvatarImage from '../../../../shared/Avatar/AvatarImage';
import GenericCard from '../../../GenericCard';
import { Card } from '../../../../../types';

const Container = styled.div<{ reduceOpacity: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ reduceOpacity }) =>
    reduceOpacity &&
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

interface OtherPlayerHandProps {
  avatar: string;
  hand?: Card[];
  isActivePlayer: boolean;
  isEndRound: boolean;
  isYanivCaller: boolean;
  numberOfCards?: number;
  score: number;
  username: string;
}

const OtherPlayerHand = ({
  avatar,
  hand,
  isActivePlayer,
  isEndRound,
  isYanivCaller,
  numberOfCards,
  score,
  username,
}: OtherPlayerHandProps) => {
  return (
    <Container reduceOpacity={!isActivePlayer && !isEndRound}>
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
        {isActivePlayer && !isEndRound && <Dots />}
      </div>
      {isEndRound && isYanivCaller && <YanivText />}
      {!isEndRound && <Circle isActivePlayer={isActivePlayer} />}
    </Container>
  );
};

export default OtherPlayerHand;
