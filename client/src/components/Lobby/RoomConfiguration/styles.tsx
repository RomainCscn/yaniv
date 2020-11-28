import styled, { css } from 'styled-components';

export const ParameterContainer = styled.div`
  display: flex;
  margin-bottom: 1.5em;
`;

interface ValueButtonProps {
  selected: boolean;
}

export const ValueButton = styled.button<ValueButtonProps>`
  padding: 0.5em;
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5em;
  background-color: white;
  border: 2px solid white;
  color: #285e61;
  cursor: pointer;
  margin: 0.5em 0.5em 0.5em 0;
  opacity: 0.8;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);

  ${({ selected }) =>
    selected &&
    css`
      opacity: 1;
      border: 2px solid #38b2ac;
    `}
`;
