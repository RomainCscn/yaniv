import styled from 'styled-components';

export const Error = styled.div`
  position: absolute;
  bottom: -24px;
  font-size: 16px;
`;

export const PlayersAvatarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  grid-auto-rows: 75px;
`;

export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  word-break: break-word;
`;

export const PlayerName = styled.div`
  font-size: 20px;
  margin-left: 12px;
`;
