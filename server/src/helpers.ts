import * as WebSocket from 'ws';
import logger from './logger';
import { CustomWebSocket, Data } from './types';

export const getData = (message: string): Data | undefined => {
  try {
    const data = JSON.parse(message);

    return data;
  } catch {
    logger.error({ message }, 'Error parsing message');

    return undefined;
  }
};

export const getWSInterval = (wss: WebSocket.Server): NodeJS.Timeout =>
  setInterval(() => {
    wss.clients.forEach((ws: WebSocket) => {
      const customWs = ws as CustomWebSocket;

      if (!customWs.isAlive) {
        logger.warn('Player disconnected due to inactive WebSocket');

        return customWs.terminate();
      }

      customWs.isAlive = false;
      customWs.ping(null, undefined);
    });
  }, 10000);
