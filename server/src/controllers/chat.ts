import { sendMessage } from '../core/dispatcher';
import { getFormattedPlayer } from '../core/room';
import rooms from '../core/rooms';
import { Message } from '../types';

const handleChat = (messageContent: string, roomId: string, playerUuid: string): void => {
  const room = rooms[roomId];

  const formattedMessage: Message = {
    content: messageContent,
    player: getFormattedPlayer(room, playerUuid),
    time: new Date().toISOString(),
  };

  sendMessage(room, formattedMessage);
};

export default handleChat;
