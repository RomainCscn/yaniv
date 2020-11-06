import React from 'react';

import CardComponent from '../Card';
import { Card } from '../../types';

interface StackProps {
  canPlay: boolean;
  hasDrop: boolean;
  pickCard: (card?: Card) => void;
}

const Stack = ({ canPlay, hasDrop, pickCard }: StackProps) => {
  return <CardComponent canPlay={canPlay} hasDrop={hasDrop} pickCard={pickCard} isStack />;
};

export default Stack;
