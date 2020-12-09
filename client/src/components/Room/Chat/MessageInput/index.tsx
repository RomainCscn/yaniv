import React, { KeyboardEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

import Input from '../../../shared/Input';
import { send } from '../../../../core/client';
import { ReactComponent as SendIcon } from '../../../../assets/icons/send.svg';

const Container = styled.div`
  background-color: #edf2f7;
  padding: 1.2em 0.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const TextInput = styled(Input)`
  background-color: white;
  border: 1px solid #cbd5e0;
  width: 100%;
`;

const SendButton = styled.div`
  margin-left: 0.8em;
  cursor: pointer;
`;

const MessageInput = ({ roomId, playerUuid }: { roomId: string; playerUuid: string }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = useCallback(() => {
    if (newMessage.length > 0)
      send(roomId, { action: 'MESSAGE' }, { message: newMessage, player: { uuid: playerUuid } });
    setNewMessage('');
  }, [newMessage, roomId, playerUuid]);

  const handleMessageChange = useCallback((e) => setNewMessage(e.target.value), []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    },
    [sendMessage],
  );

  return (
    <Container>
      <TextInput
        placeholder='Aa'
        value={newMessage}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
      <SendButton onClick={sendMessage}>
        <SendIcon fill='#667EEA' width='32px' height='32px' />
      </SendButton>
    </Container>
  );
};

export default MessageInput;
