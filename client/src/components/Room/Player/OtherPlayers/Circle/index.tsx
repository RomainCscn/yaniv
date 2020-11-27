import styled, { css } from 'styled-components';

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
          top: -24px;
        `
      : css`
          top: -166px;
        `}
`;

export default Circle;
