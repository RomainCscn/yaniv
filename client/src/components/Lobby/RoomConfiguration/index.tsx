import React from 'react';
import { useTranslation } from 'react-i18next';

import { ParameterContainer, ValueButton } from './styles';
import { ButtonContainer, Container, SectionTitle, Label } from '../styles';
import Button from '../../shared/Button';
import { send } from '../../../core/client';

interface ParameterProps {
  currentValue: number;
  dataCy?: string;
  setValue: (v: number) => void;
  value: number;
}

const ParameterButton = ({ currentValue, dataCy, setValue, value }: ParameterProps) => (
  <ValueButton data-cy={dataCy} selected={currentValue === value} onClick={() => setValue(value)}>
    {value}
  </ValueButton>
);

interface Props {
  roomId: string;
  handCardsNumber: number;
  setHandCardsNumber: (v: number) => void;
  scoreLimit: number;
  setScoreLimit: (v: number) => void;
}

const RoomConfiguration = ({
  roomId,
  handCardsNumber,
  setHandCardsNumber,
  scoreLimit,
  setScoreLimit,
}: Props) => {
  const { t } = useTranslation('lobby');

  const updateRoomConfiguration = () => {
    send(roomId, { action: 'CONFIGURATION' }, { configuration: { handCardsNumber, scoreLimit } });
  };

  return (
    <Container color='gray'>
      <SectionTitle color='gray'>{t('room.title')}</SectionTitle>
      <Label>{t('room.cardsNumber')}</Label>
      <ParameterContainer>
        <ParameterButton
          dataCy='cards-5'
          currentValue={handCardsNumber}
          setValue={setHandCardsNumber}
          value={5}
        />
        <ParameterButton currentValue={handCardsNumber} setValue={setHandCardsNumber} value={7} />
      </ParameterContainer>
      <Label>{t('room.scoreLimit')}</Label>
      <ParameterContainer>
        <ParameterButton currentValue={scoreLimit} setValue={setScoreLimit} value={100} />
        <ParameterButton currentValue={scoreLimit} setValue={setScoreLimit} value={200} />
      </ParameterContainer>
      <ButtonContainer>
        <Button data-cy='updateRoom' color={'gray'} onClick={updateRoomConfiguration}>
          {t('update')}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default RoomConfiguration;
