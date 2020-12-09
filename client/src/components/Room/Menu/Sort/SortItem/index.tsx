import React from 'react';
import styled from 'styled-components';
import { SortOrder, SortType } from '../../../../../types';

const Container = styled.label`
  margin-bottom: 0.2em;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SortLabel = styled.span`
  margin-left: 0.5em;
`;

interface Props {
  isChecked: boolean;
  label: string;
  setValue: any;
  value: SortOrder | SortType;
}

const SortItem = ({ isChecked, label, setValue, value }: Props) => (
  <Container>
    <input type='radio' checked={isChecked} onChange={() => setValue(value)} />
    <SortLabel>{label}</SortLabel>
  </Container>
);

export default SortItem;
