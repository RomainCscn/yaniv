import { MessageAction, MessageActionType } from '../types';

const ROOM = 'TEST';

export const send = (
  client: WebSocket,
  action: MessageAction,
  actionType?: MessageActionType,
  data?: object,
) => {
  client.send(JSON.stringify({ action, actionType, room: ROOM, ...data }));
};
