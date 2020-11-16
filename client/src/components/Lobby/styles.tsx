import styled, { css } from 'styled-components';

const colors = {
  bg: {
    green: css`
      background-color: #e6fffa;
    `,
    indigo: css`
      background-color: #c3dafe;
    `,
  },
  text: {
    green: css`
      color: #2f855a;
    `,
    gray: css`
      color: #4a5568;
    `,
    indigo: css`
      color: #4c51bf;
    `,
  },
};

export const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

interface ContainerProps {
  color: 'green' | 'indigo';
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 12px 24px 24px;
  border-radius: 12px;
  margin: 12px;
  width: 600px;
  min-height: 330px;
  ${({ color }) => colors.bg[color]};
`;

export const Label = styled.label`
  font-size: 20px;
  margin-right: 12px;
`;

interface SectionContainerProps {
  alignStart?: boolean;
}

export const SectionContainer = styled.div<SectionContainerProps>`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  ${({ alignStart }) =>
    alignStart &&
    css`
      align-items: flex-start;
    `};
`;

interface SectionTitleProps {
  color: 'gray' | 'green' | 'indigo';
}

export const SectionTitle = styled.h2<SectionTitleProps>`
  letter-spacing: 1px;
  font-family: 'Simplicity';
  font-size: 48px;
  margin: 12px 0;
  ${({ color }) => colors.text[color]};
`;

export const Title = styled.h1`
  margin-top: 24px;
  color: #3182ce;
  text-align: center;
  font-size: 76px;
  font-family: 'Alloy';
`;
