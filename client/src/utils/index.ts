import { MessageAction, MessageActionType } from '../types';

export const send = (
  client: WebSocket,
  room: string,
  { action, actionType }: { action: MessageAction; actionType?: MessageActionType },
  data?: object,
) => {
  client.send(JSON.stringify({ action, actionType, room, ...data }));
};
