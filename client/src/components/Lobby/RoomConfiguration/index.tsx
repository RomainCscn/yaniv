import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container, ParameterContainer, ValueButton } from './styles';
import { ButtonContainer, SectionTitle, Label } from '../styles';
import Button from '../../shared/Button';
import { send } from '../../../core/client';

interface Props {
  roomId: string;
  handCardsNumber: number;
  setHandCardsNumber: (v: number) => void;
  scoreLimit: number;
  setScoreLimit: (v: number) => void;
}

const ParameterButton = ({
  currentValue,
  setValue,
  value,
}: {
  currentValue: number;
  setValue: (v: number) => void;
  value: number;
}) => (
  <ValueButton selected={currentValue === value} onClick={() => setValue(value)}>
    {value}
  </ValueButton>
);

const RoomConfiguration = ({
  roomId,
  handCardsNumber,
  setHandCardsNumber,
  scoreLimit,
  setScoreLimit,
}: Props) => {
  const { t } = useTranslation();

  const updateRoomConfiguration = () => {
    send(roomId, { action: 'CONFIGURATION' }, { handCardsNumber, scoreLimit });
  };

  return (
    <Container>
      <SectionTitle color='gray'>{t('lobby.room.title')}</SectionTitle>
      <Label>{t('lobby.room.cardsNumber')}</Label>
      <ParameterContainer>
        <ParameterButton currentValue={handCardsNumber} setValue={setHandCardsNumber} value={5} />
        <ParameterButton currentValue={handCardsNumber} setValue={setHandCardsNumber} value={7} />
      </ParameterContainer>
      <Label>{t('lobby.room.scoreLimit')}</Label>
      <ParameterContainer>
        <ParameterButton currentValue={scoreLimit} setValue={setScoreLimit} value={100} />
        <ParameterButton currentValue={scoreLimit} setValue={setScoreLimit} value={200} />
      </ParameterContainer>
      <ButtonContainer>
        <Button color={'gray'} onClick={updateRoomConfiguration}>
          {t('common.update')}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default RoomConfiguration;
