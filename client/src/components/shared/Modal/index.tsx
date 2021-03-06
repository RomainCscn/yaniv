import React from 'react';
import styled, { css } from 'styled-components';

import DefaultButton from '../Button';

type Color = 'orange';

const Container = styled.div<{ color: Color }>`
  position: absolute;
  min-width: 600px;
  padding: 2em;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1em;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  ${({ color }) => {
    switch (color) {
      case 'orange':
        return css`
          background-color: rgba(254, 235, 200, 0.9);
        `;
    }
  }}
`;

const Title = styled.h2<{ color: Color }>`
  margin-bottom: 2em;
  font-size: 2rem;
  ${({ color }) => {
    switch (color) {
      case 'orange':
        return css`
          color: #622310;
        `;
    }
  }}
`;

const Text = styled.p`
  margin-bottom: 3em;
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
`;

const Button = styled(DefaultButton)`
  font-size: 1.2rem;
  margin-right: 1.5em;
`;

interface Props {
  color: 'orange';
  content: string;
  primaryAction: () => void;
  primaryButtonText: string;
  secondaryAction?: () => void;
  secondaryButtonText?: string;
  title: string;
}

const Modal = ({
  color,
  content,
  primaryAction,
  primaryButtonText,
  secondaryAction,
  secondaryButtonText,
  title,
}: Props) => (
  <Container color={color}>
    <Title color={color}>{title}</Title>
    <Text>{content}</Text>
    {secondaryAction && secondaryButtonText && (
      <Button color={'gray'} onClick={secondaryAction}>
        {secondaryButtonText}
      </Button>
    )}
    <Button color={color} onClick={primaryAction}>
      {primaryButtonText}
    </Button>
  </Container>
);

export default Modal;
