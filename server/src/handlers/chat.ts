import { Room } from '../core/room';
import { Data, FormattedPlayer } from '../types';

interface Message {
  content: string;
  player: FormattedPlayer;
  time: string;
}

const handleChat = (room: Room, { player: { uuid }, message: content }: Data): void => {
  const message: Message = {
    content,
    player: room.getFormattedPlayer(uuid),
    time: new Date().toISOString(),
  };

  room.dispatch({ type: 'NEW_MESSAGE', data: { message } });
};

export default handleChat;
