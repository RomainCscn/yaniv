import styled, { css } from 'styled-components';

type Color = 'green' | 'gray' | 'orange' | 'purple';

const handleColor = (color: Color) => {
  switch (color) {
    case 'green':
      return css`
        color: #0d502e;
        background: #48bb78;
        border-bottom: 4px solid #2f855a;
      `;
    case 'gray':
      return css`
        color: #1a202c;
        background: #a0aec0;
        border-bottom: 4px solid #4a5568;
      `;
    case 'orange':
      return css`
        color: #531c0c;
        background: #ed8936;
        border-bottom: 4px solid #c05621;
      `;
    case 'purple':
      return css`
        color: #2d156d;
        background: #667eea;
        border-bottom: 4px solid #4c51bf;
      `;
  }
};

const handleActiveBorderColor = (color: Color) => {
  switch (color) {
    case 'green':
      return css`
        border-bottom: 2px solid #48bb78;
      `;
    case 'gray':
      return css`
        border-bottom: 2px solid #a0aec0;
      `;
    case 'orange':
      return css`
        border-bottom: 2px solid #ed8936;
      `;
    case 'purple':
      return css`
        border-bottom: 2px solid #667eea;
      `;
  }
};

const Button = styled.button<{ color?: Color }>`
  padding: 0 12px;
  font-size: 2rem;
  height: 60px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  ${({ color }) => color && handleColor(color)};

  &:active {
    transform: translateY(2px);
    ${({ color }) => color && handleActiveBorderColor(color)};
  }
`;

export default Button;
