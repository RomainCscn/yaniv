import React from 'react';

import CardComponent from './StackCard';
import { Card } from '../../types';

interface StackProps {
  canPlay: boolean;
  hasDrop: boolean;
  pickCard: (card?: Card) => void;
}

const Stack = ({ canPlay, hasDrop, pickCard }: StackProps) => {
  return <CardComponent canPlay={canPlay} hasDrop={hasDrop} pickCard={pickCard} />;
};

export default Stack;
