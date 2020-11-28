import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Message from './Message';
import NewMessage from './NewMessage';
import { ReactComponent as ChatIcon } from '../../../assets/icons/chat.svg';
import { Message as MessageType } from '../../../types';

interface Props {
  messages: MessageType[];
  roomId: string;
  playerUuid: string;
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
  padding: 1em 0.5em;
  overflow: auto;
  height: calc(100vh - 134px);
`;

const HideButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: #2c5282;
  background-color: #edf2f7;
  cursor: pointer;
`;

const ChatButton = styled.div`
  position: absolute;
  padding: 0.8em;
  top: 1em;
  right: 1em;
  display: flex;
  align-items: center;
  border: 1px solid #2c5282;
  border-radius: 0.8em;
  background-color: white;
  cursor: pointer;
`;

const ChatNotification = styled.div`
  position: absolute;
  width: 0.9em;
  height: 0.9em;
  background: #e53e3e;
  top: -4px;
  right: -4px;
  z-index: 10;
  border-radius: 100%;
`;

const MessagesHeader = styled.div`
  padding: 1rem;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  background-color: #edf2f7;
`;

const Chat = ({ messages, roomId, playerUuid }: Props) => {
  const { t } = useTranslation('room');

  const messagesRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  useEffect(() => {
    if (messages.filter((message) => message.player.uuid !== playerUuid).length >= 1) {
      setHasNewMessage(true);
    }
  }, [messages, playerUuid]);

  return (
    <Container>
      <ChatButton
        style={{ display: isVisible ? 'none' : '' }}
        onClick={() => {
          setIsVisible(true);
          setHasNewMessage(false);
        }}
      >
        {!isVisible && hasNewMessage && <ChatNotification />}
        <ChatIcon fill='#2c5282' height='24px' />
      </ChatButton>
      <ChatContainer style={{ display: isVisible ? '' : 'none' }}>
        <HideButton
          onClick={() => {
            setIsVisible(false);
            setHasNewMessage(false);
          }}
        >
          X
        </HideButton>
        <MessagesHeader>{t('chat.title')}</MessagesHeader>
        <MessagesContainer>
          {messages.map((message) => (
            <Message isSelf={message.player.uuid === playerUuid} message={message} />
          ))}
          <div ref={messagesRef}></div>
        </MessagesContainer>
        <NewMessage roomId={roomId} playerUuid={playerUuid} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;
