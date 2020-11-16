import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #e2e8f0;
  padding: 12px 24px 24px;
  border-radius: 12px;
  width: 600px;
  margin: 12px;
`;

export const ParameterContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

interface ValueButtonProps {
  selected: boolean;
}

export const ValueButton = styled.button<ValueButtonProps>`
  padding: 12px;
  font-size: 2rem;
  width: 82px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background-color: white;
  border: 2px solid white;
  color: #285e61;
  cursor: pointer;
  margin: 12px;
  opacity: 0.8;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);

  ${({ selected }) =>
    selected &&
    css`
      opacity: 1;
      border: 2px solid #38b2ac;
    `}
`;
