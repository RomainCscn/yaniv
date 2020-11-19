import React from 'react';

import ScoreContainer from './styles';
import { ReactComponent as CardsIcons } from '../../../../assets/icons/playing-cards.svg';

const Score = ({ score }: { score: number }) => {
  return (
    <ScoreContainer isHandScore>
      <CardsIcons fill={'#4c51bf'} /> {score}
    </ScoreContainer>
  );
};

export default Score;
