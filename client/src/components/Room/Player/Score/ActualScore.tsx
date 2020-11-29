import React from 'react';

import ScoreContainer from './styles';
import { ReactComponent as TrophyIcons } from '../../../../assets/icons/trophy.svg';

const Score = ({ isOtherPlayer, score }: { isOtherPlayer?: boolean; score: number }) => {
  return (
    <ScoreContainer isOtherPlayer={isOtherPlayer}>
      <TrophyIcons fill={'#2c7a7b'} height={'2rem'} />
      {score}
    </ScoreContainer>
  );
};

export default Score;
