import React from 'react';

import Avatar from '../Avatar/AvatarImage';
import NextRoundButton from '../NextRoundButton';
import PlayAgainButton from '../PlayAgainButton';
import { Player } from '../../types';

import trophy from '../../assets/winner-trophy.png';

import styles from './styles.module.css';

interface Props {
  gameWinner?: Player;
  roomId: string;
  roundWinner?: Player;
  userUuid: string;
}

const EndRound = ({ gameWinner, roomId, roundWinner, userUuid }: Props) => {
  return (
    <>
      {gameWinner ? (
        <>
          <div className={styles.gameWinnerContainer}>
            <div className={styles.endGameText}>Fin de la partie</div>
            {gameWinner.uuid === userUuid && (
              <img style={{ marginBottom: '24px' }} src={trophy} alt='trophy' />
            )}
            <div className={styles.winnerAvatarContainer}>
              <div className={styles.winnerText}>Bravo</div>
              <Avatar id={gameWinner.avatar} />
              <span className={styles.winnerUsername}>{gameWinner.username}</span>
            </div>
            <PlayAgainButton roomId={roomId} />
          </div>
        </>
      ) : (
        roundWinner && (
          <div className={styles.roundWinnerContainer}>
            <div style={{ marginBottom: '24px' }} className={styles.winnerText}>
              {roundWinner.uuid === userUuid ? 'GAGNÉ 🥳' : 'PERDU !'}
            </div>
            {roundWinner.uuid !== userUuid && (
              <div className={styles.winnerAvatarContainer}>
                <div>Gagnant de la manche</div>
                <Avatar id={roundWinner.avatar} />
                <span className={styles.winnerUsername}>{roundWinner.username}</span>
              </div>
            )}
            <NextRoundButton roomId={roomId} />
          </div>
        )
      )}
    </>
  );
};

export default EndRound;
