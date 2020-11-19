import React from 'react';
import styled from 'styled-components';

import Avatar from '../../../shared/Avatar/AvatarImage';
import { Message as MessageType } from '../../../../types';

interface Props {
  isSelf: boolean;
  message: MessageType;
}

const Container = styled.div<{ isSelf: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isSelf }) => (isSelf ? 'flex-end' : 'flex-start')};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const MessageContainer = styled.div`
  margin: 6px;
  display: flex;
  flex-direction: column;
`;

const MessageContent = styled.div<{ isSelf: boolean }>`
  padding: 12px;
  max-width: 150px;
  border-radius: 12px;
  word-break: break-word;
  background-color: ${({ isSelf }) => (isSelf ? '#BEE3F8' : '#EDF2F7')};
  color: ${({ isSelf }) => (isSelf ? '#2A4365' : '#2D3748')};

  @media screen and (max-height: 850px) {
    font-size: 14px;
  }
`;

const MessageSender = styled.div`
  margin-bottom: 2px;
  font-size: 12px;
  color: #718096;
`;

const MessageDate = styled.div`
  margin: 3px 0 0 3px;
  font-size: 10px;
  color: #718096;
`;

const AvatarImage = styled(Avatar)`
  width: 24px;
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
