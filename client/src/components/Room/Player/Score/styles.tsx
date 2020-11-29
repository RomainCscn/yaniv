import styled, { css } from 'styled-components';

interface Props {
  isHandScore?: boolean;
  isOtherPlayer?: boolean;
}

const ScoreContainer = styled.div<Props>`
  border-radius: 0.8em;
  color: #2c7a7b;
  padding: 0.4em;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isHandScore }) =>
    isHandScore &&
    css`
      color: #4c51bf;
    `}

  ${({ isOtherPlayer }) =>
    isOtherPlayer &&
    css`
      border: none;
    `}
`;

export default ScoreContainer;
