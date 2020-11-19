import React from 'react';
import styled from 'styled-components';

import GenericCard from '../GenericCard';

interface StackProps {
  canPlay: boolean;
  pickCard: () => void;
}

const Container = styled.div`
  position: relative;
`;

const Stack = ({ canPlay, pickCard }: StackProps) => (
  <Container>
    <GenericCard canClick={false} cardType={'false'} degree={10} />
    <GenericCard canClick={false} cardType={'false'} degree={20} />
    <GenericCard canClick={canPlay} cardType={'stack'} onCardClick={() => pickCard()} />
  </Container>
);

export default Stack;
