import React from 'react';
import styled from 'styled-components';

import Avatar from '../../../shared/Avatar/AvatarImage';
import { ChatMessage } from '../../../../types';

interface Props {
  isSelf: boolean;
  message: ChatMessage;
}

const Container = styled.div<{ isSelf: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isSelf }) => (isSelf ? 'flex-end' : 'flex-start')};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const MessageContainer = styled.div`
  margin: 0.4em;
  display: flex;
  flex-direction: column;
`;

const MessageContent = styled.div<{ isSelf: boolean }>`
  padding: 0.8em;
  max-width: 150px;
  border-radius: 0.8em;
  word-break: break-word;
  background-color: ${({ isSelf }) => (isSelf ? '#BEE3F8' : '#EDF2F7')};
  color: ${({ isSelf }) => (isSelf ? '#2A4365' : '#2D3748')};
  font-size: 0.9rem;
`;

const MessageSender = styled.div`
  margin-bottom: 0.1em;
  font-size: 0.6rem;
  color: #718096;
`;

const MessageDate = styled.div`
  margin: 0.1em 0 0 0.1em;
  font-size: 0.6rem;
  color: #718096;
`;

const AvatarImage = styled(Avatar)`
  width: 1.2em;
  padding: 0;
`;

const Message = ({ isSelf, message }: Props) => (
  <Container isSelf={isSelf}>
    {!isSelf && <AvatarImage id={message.player.avatar} />}
    <MessageContainer>
      {!isSelf && <MessageSender>{message.player.username}</MessageSender>}
      <MessageContent isSelf={isSelf}>{message.content}</MessageContent>
      <MessageDate>
        {new Date(message.time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </MessageDate>
    </MessageContainer>
  </Container>
);

export default Message;
