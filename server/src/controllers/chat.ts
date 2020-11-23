import { sendMessage } from '../core/dispatcher';
import { Room } from '../core/room';
import { Message } from '../types';

const handleChat = (room: Room, playerUuid: string, messageContent: string): void => {
  const formattedMessage: Message = {
    content: messageContent,
    player: room.getFormattedPlayer(playerUuid),
    time: new Date().toISOString(),
  };

  sendMessage(room, formattedMessage);
};

export default handleChat;
