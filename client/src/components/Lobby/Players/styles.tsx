import styled from 'styled-components';

export const Error = styled.div`
  position: absolute;
  bottom: -2em;
`;

export const PlayersAvatarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.8em;
  grid-auto-rows: 4em;
`;

export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8em;
  word-break: break-word;
`;

export const PlayerName = styled.div`
  font-size: 1.2rem;
  margin-left: 0.5em;
`;
