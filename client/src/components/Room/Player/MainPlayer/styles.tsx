import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 1.2em;
`;

export const HandContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(175px + 2em); // to handle selected cards margin

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
  margin-top: 0.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-height: 850px) {
    width: 300px;
  }
`;

export const ActivePlayer = styled.div<{ isActivePlayer: boolean }>`
  background: #f0fdf4;
  height: 325px;
  width: 650px;
  border-top-left-radius: 650px;
  border-top-right-radius: 650px;
  position: absolute;
  z-index: -1;
  border: 2px solid #bbf7d0;
  border-bottom: none;
  transition: all 0.5s ease-out;
  left: 50%;
  transform: translate(-50%, 0);

  @media screen and (max-height: 850px) {
    height: 250px;
    width: 500px;
    border-top-left-radius: 500px;
    border-top-right-radius: 500px;
  }

  ${({ isActivePlayer }) =>
    isActivePlayer
      ? css`
          bottom: -2.5em;
        `
      : css`
          bottom: -350px;
        `}
`;
