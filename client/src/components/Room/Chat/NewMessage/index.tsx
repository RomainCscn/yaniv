import React, { KeyboardEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

import Input from '../../../shared/Input';
import { send } from '../../../../core/client';
import { ReactComponent as SendIcon } from '../../../../assets/icons/send.svg';

const Container = styled.div`
  background-color: #edf2f7;
  padding: 24px 12px;
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
  margin-left: 12px;
  cursor: pointer;
`;

const NewMessage = ({ roomId, userUuid }: { roomId: string; userUuid: string }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = useCallback(() => {
    if (newMessage.length > 0)
      send(roomId, { action: 'MESSAGE' }, { message: newMessage, player: { uuid: userUuid } });
    setNewMessage('');
  }, [newMessage, roomId, userUuid]);

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

export default NewMessage;
