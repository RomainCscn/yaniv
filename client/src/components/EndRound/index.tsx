import React from 'react';

import NextRoundButton from '../NextRoundButton';
import PlayAgainButton from '../PlayAgainButton';
import { Player } from '../../types';

interface Props {
  gameWinner?: Player;
  roomId: string;
  roundWinner?: Player;
  userUuid: string;
}

const EndRound = ({ gameWinner, roomId, roundWinner, userUuid }: Props) => {
  return (
    <div>
      {gameWinner ? (
        <div>
          <div>Gagnant de la partie : {gameWinner.username} !</div>
          <PlayAgainButton roomId={roomId} />
        </div>
      ) : (
        roundWinner && (
          <div>
            <NextRoundButton roomId={roomId} />
            {roundWinner.uuid === userUuid
              ? 'GAGNÉ'
              : 'PERDU - Gagnant de la manche ' + roundWinner.username}
          </div>
        )
      )}
    </div>
  );
};

export default EndRound;
