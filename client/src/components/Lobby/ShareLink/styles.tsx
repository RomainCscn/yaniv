import styled from 'styled-components';

export const Link = styled.a`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: #2b6cb0;
  margin-right: 1em;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

export const LinkText = styled.p`
  font-style: italic;
  font-size: 1.5rem;
  text-align: center;
`;

export const CopyButton = styled.button`
  padding: 0.8em;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 0.8em;
  background-color: #4299e1;
  color: #f0fff4;
  cursor: pointer;
  border-bottom: 4px solid #2b6cb0;
  &:active {
    transform: translateY(2px);
    border-bottom: 2px solid #4299e1;
  }
`;
