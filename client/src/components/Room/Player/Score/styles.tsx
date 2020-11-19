import styled, { css } from 'styled-components';

interface Props {
  isHandScore?: boolean;
  isOtherPlayer?: boolean;
}

const ScoreContainer = styled.div<Props>`
  border-radius: 12px;
  color: #2c7a7b;
  padding: 6px;
  font-weight: bold;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isHandScore }) =>
    isHandScore &&
    css`
      color: #4c51bf;
      width: 46px;
    `}

  ${({ isOtherPlayer }) =>
    isOtherPlayer &&
    css`
      border: none;
    `}
`;

export default ScoreContainer;
