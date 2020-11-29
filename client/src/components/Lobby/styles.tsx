import styled, { css } from 'styled-components';

const colors = {
  bg: {
    gray: css`
      background-color: #e2e8f0;
    `,
    green: css`
      background-color: #e6fffa;
    `,
    indigo: css`
      background-color: #c3dafe;
    `,
  },
  text: {
    gray: css`
      color: #4a5568;
    `,
    green: css`
      color: #2f855a;
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
  color: 'gray' | 'green' | 'indigo';
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 0.5em 1em 1em;
  border-radius: 0.5em;
  margin: 0.5em;
  width: 600px;
  min-height: 330px;
  ${({ color }) => colors.bg[color]};
`;

export const Label = styled.label`
  font-size: 1.2rem;
  margin-right: 0.8em;
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
  font-size: 3rem;
  margin: 0 0 0.2em;
  ${({ color }) => colors.text[color]};
`;

export const Title = styled.h1`
  margin-top: 0.5em;
  background-image: linear-gradient(
    109.6deg,
    rgba(48, 207, 208, 1) 11.2%,
    rgba(51, 8, 103, 1) 92.5%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-size: 5rem;
  font-family: 'Alloy';
`;

export const Languages = styled.div`
  position: absolute;
  top: 1em;
  left: 1em;
  display: flex;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  color: #075985;
  text-decoration: underline;

  div:first-child {
    margin-right: 0.5em;
  }
`;
