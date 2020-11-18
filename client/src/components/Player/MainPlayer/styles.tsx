import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 92px;
  right: -192px;
  @media screen and (max-height: 850px) {
    top: 56px;
  }
`;

export const HandContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 246px;

  @media screen and (max-height: 850px) {
    min-height: 170px;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ScoreContainer = styled.div`
  width: 400px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-height: 850px) {
    width: 300px;
  }
`;

export const ActivePlayer = styled.div`
  width: 100%;
  height: 12px;
  background-color: #4fd1c5;
  position: absolute;
  bottom: 0;

  @media screen and (max-height: 850px) {
    height: 9px;
  }
`;
