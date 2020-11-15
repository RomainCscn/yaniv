import React from 'react';
import classnames from 'classnames';

import { send } from '../../../core/client';

import styles from './styles.module.css';
import commonStyles from '../styles.module.css';

interface Props {
  roomId: string;
  handCardsNumber: number;
  setHandCardsNumber: (v: number) => void;
  scoreLimit: number;
  setScoreLimit: (v: number) => void;
}

const ScoreButton = ({
  currentValue,
  setValue,
  value,
}: {
  currentValue: number;
  setValue: (v: number) => void;
  value: number;
}) => (
  <button
    className={classnames(styles.valueButton, { [styles.selected]: currentValue === value })}
    onClick={() => setValue(value)}
  >
    {value}
  </button>
);

const RoomConfiguration = ({
  roomId,
  handCardsNumber,
  setHandCardsNumber,
  scoreLimit,
  setScoreLimit,
}: Props) => {
  const updateRoomConfiguration = () => {
    send(roomId, { action: 'CONFIGURATION' }, { handCardsNumber, scoreLimit });
  };

  return (
    <div className={styles.container}>
      <h2 className={classnames(commonStyles.sectionTitle, commonStyles.gray)}>
        Paramètres de jeu
      </h2>
      <label className={commonStyles.label}>Nombre de cartes par main</label>
      <div className={styles.buttonContainer}>
        <ScoreButton currentValue={handCardsNumber} setValue={setHandCardsNumber} value={5} />
        <ScoreButton currentValue={handCardsNumber} setValue={setHandCardsNumber} value={7} />
      </div>
      <label className={commonStyles.label}>Limite de score</label>
      <div className={styles.buttonContainer}>
        <ScoreButton currentValue={scoreLimit} setValue={setScoreLimit} value={100} />
        <ScoreButton currentValue={scoreLimit} setValue={setScoreLimit} value={200} />
      </div>
      <div className={commonStyles.buttonContainer}>
        <button className={styles.updateButton} onClick={updateRoomConfiguration}>
          Mettre à jour
        </button>
      </div>
    </div>
  );
};

export default RoomConfiguration;
