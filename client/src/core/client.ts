import { MessageAction, MessageActionType } from '../types';

const client = new WebSocket('ws://localhost:8999/');

export const send = (
  room: string,
  { action, actionType }: { action: MessageAction; actionType?: MessageActionType },
  data?: object,
) => {
  client.send(JSON.stringify({ action, actionType, room, ...data }));
};

export default client;
