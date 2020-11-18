import React from 'react';
import styled, { keyframes } from 'styled-components';

const DotsContainer = styled.div`
  position: absolute;
  font-size: 32px;
  width: 50px;
  text-align: center;
  top: 42px;
  padding: 6px;

  @media screen and (max-height: 850px) {
    top: 24px;
    font-size: 24px;
    width: 30px;
  }
`;

const blink = keyframes`
  50% { color: transparent; }
`;

const Dot = styled.span`
  animation: 1s ${blink} infinite;
  &:nth-child(1) {
    animation-delay: 0ms;
  }
  &:nth-child(2) {
    animation-delay: 250ms;
  }
  &:nth-child(3) {
    animation-delay: 500ms;
  }
`;

const Dots = () => (
  <DotsContainer>
    <Dot>.</Dot>
    <Dot>.</Dot>
    <Dot>.</Dot>
  </DotsContainer>
);

export default Dots;
