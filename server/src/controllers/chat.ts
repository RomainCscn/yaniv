import { Room } from '../core/room';
import { Message } from '../types';

const handleChat = (room: Room, playerUuid: string, messageContent: string): void => {
  const message: Message = {
    content: messageContent,
    player: room.getFormattedPlayer(playerUuid),
    time: new Date().toISOString(),
  };

  room.dispatch({ type: 'NEW_MESSAGE', data: { message } });
};

export default handleChat;
