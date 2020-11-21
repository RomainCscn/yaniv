import { sendMessage } from '../core/dispatcher';
import { getFormattedPlayer } from '../core/room';
import rooms from '../core/rooms';
import { Message } from '../types';

const handleChat = (messageContent: string, roomId: string, playerUuid: string): void => {
  const formattedMessage: Message = {
    content: messageContent,
    player: getFormattedPlayer(rooms[roomId], playerUuid),
    time: new Date().toISOString(),
  };

  sendMessage(rooms[roomId], formattedMessage);
};

export default handleChat;
