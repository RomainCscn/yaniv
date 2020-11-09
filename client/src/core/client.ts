import { MessageAction, MessageActionType } from '../types';

const client = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL);

export const send = (
  room: string,
  { action, actionType }: { action: MessageAction; actionType?: MessageActionType },
  data?: object,
) => {
  client.send(JSON.stringify({ action, actionType, room, ...data }));
};

export default client;
