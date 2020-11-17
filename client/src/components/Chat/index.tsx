import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Message from './Message';
import NewMessage from './NewMessage';
import { Message as MessageType } from '../../types';
import { ReactComponent as ChatIcon } from '../../assets/chat.svg';

interface Props {
  messages: MessageType[];
  roomId: string;
  userUuid: string;
}

const Container = styled.div`
  position: relative;
  max-width: 350px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const ChatContainer = styled.div`
  background-color: white;
`;

const MessagesContainer = styled.div`
  padding: 12px 12px;
  overflow: auto;
  height: calc(100vh - 184px);
`;

const HideButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #2c5282;
  background-color: #edf2f7;
  cursor: pointer;
`;

const ChatButton = styled(HideButton)`
  top: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  border: 1px solid #2c5282;
  border-radius: 12px;
  background-color: white;
`;

const ChatButtonText = styled.span`
  margin-right: 9px;
`;

const MessagesHeader = styled.div`
  height: 64px;
  background-color: #edf2f7;
`;

const Chat = ({ messages, roomId, userUuid }: Props) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <Container>
      <ChatButton style={{ display: isVisible ? 'none' : '' }} onClick={() => setIsVisible(true)}>
        <ChatButtonText>CHAT</ChatButtonText>
        <ChatIcon fill='#2c5282' height='24px' />
      </ChatButton>
      <ChatContainer style={{ display: isVisible ? '' : 'none' }}>
        <HideButton onClick={() => setIsVisible(false)}>Cacher</HideButton>
        <MessagesHeader />
        <MessagesContainer>
          {messages.map((message) => (
            <Message isSelf={message.player.uuid === userUuid} message={message} />
          ))}
          <div ref={messagesRef}></div>
        </MessagesContainer>
        <NewMessage roomId={roomId} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;
