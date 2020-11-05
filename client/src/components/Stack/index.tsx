import React from 'react';

import CardComponent from '../Card';
import { Card } from '../../types';

interface StackProps {
  hasDrop: boolean;
  pickCard: (card?: Card) => void;
}

const Stack = ({ hasDrop, pickCard }: StackProps) => {
  return <CardComponent hasDrop={hasDrop} pickCard={pickCard} isStack />;
};

export default Stack;
