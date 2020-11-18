import styled, { css, keyframes } from 'styled-components';

interface CardImageProps {
  canClick: boolean;
  cardType?: 'false' | 'hand' | 'otherPlayer' | 'stack';
  degree?: number;
  isLast?: boolean;
  isNew?: boolean;
  isSelected?: boolean;
}

const appear = keyframes`
  0% {
    opacity: 0;
    top: -64px;
  }

  50% {
    opacity: 75;
  }

  100% {
    opacity: 1;
    top: 0;
  }
`;

const cardStyle = {
  false: css`
    position: absolute;
    z-index: -1;
  `,
  hand: css`
    margin-right: -64px;
    align-self: flex-end;

    @media screen and (max-height: 850px) {
      margin-right: -46px;
    }
  `,
  stack: css`
    margin-right: 0px;
  `,
  otherPlayer: css`
    margin-right: -36px;
    width: 53px;
    height: 75px;

    @media screen and (max-height: 850px) {
      width: 43px;
      height: 60px;
      margin-right: -24px;
    }
  `,
};

const CardImage = styled.img<CardImageProps>`
  background-color: white;
  border: 1px solid #1a202c;
  border-radius: 6px;
  transition: all 0.1s ease-in;
  width: 126px;
  height: 175px;
  margin-right: -64px;
  position: relative;
  cursor: ${({ canClick }) => (canClick ? 'pointer' : 'default')};
  transform: ${({ degree }) => (degree ? `rotate(${degree}deg)` : 'rotate(0)')};

  @media screen and (max-height: 850px) {
    width: 90px;
    height: 125px;
  }

  ${({ cardType }) => cardType && cardStyle[cardType]}

  ${({ isLast }) =>
    isLast &&
    css`
      margin-right: 0;
      @media screen and (max-height: 850px) {
        margin-right: 0;
      }
    `}
  ${({ isSelected }) =>
    isSelected &&
    css`
      margin-bottom: 36px;
    `}
  ${({ isNew }) =>
    isNew &&
    css`
      animation: ${appear} 2s forwards;
    `}
`;

export default CardImage;
