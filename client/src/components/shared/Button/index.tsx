import styled, { css } from 'styled-components';

type color = undefined | 'green' | 'gray' | 'purple';

const handleColor = (color: color) => {
  switch (color) {
    case 'green':
      return css`
        color: #f0fff4;
        background: #48bb78;
        border-bottom: 4px solid #2f855a;
      `;
    case 'gray':
      return css`
        color: #1a202c;
        background: #a0aec0;
        border-bottom: 4px solid #4a5568;
      `;
    case 'purple':
      return css`
        color: #f0fff4;
        background: #667eea;
        border-bottom: 4px solid #4c51bf;
      `;
  }
};

const handleActiveBorderColor = (color: color) => {
  switch (color) {
    case 'green':
      return css`
        border-bottom: 2px solid #48bb78;
      `;
    case 'gray':
      return css`
        border-bottom: 2px solid #a0aec0;
      `;
    case 'purple':
      return css`
        border-bottom: 2px solid #667eea;
      `;
  }
};

const Button = styled.button`
  padding: 0 12px;
  font-size: 2rem;
  height: 60px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  ${({ color }) => handleColor(color as color)};

  &:active {
    transform: translateY(2px);
    ${({ color }) => handleActiveBorderColor(color as color)};
  }
`;

export default Button;
