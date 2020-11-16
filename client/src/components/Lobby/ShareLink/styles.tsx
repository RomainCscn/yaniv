import styled from 'styled-components';

export const Link = styled.a`
  text-align: center;
  font-weight: bold;
  font-size: 26px;
  color: #2b6cb0;
  margin-right: 24px;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const LinkText = styled.p`
  font-style: italic;
  font-size: 22px;
  text-align: center;
`;

export const CopyButton = styled.button`
  padding: 0 12px;
  font-size: 18px;
  height: 42px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background-color: #4299e1;
  color: #f0fff4;
  cursor: pointer;
  border-bottom: 4px solid #2b6cb0;
  &:active {
    transform: translateY(2px);
    border-bottom: 2px solid #4299e1;
  }
`;
