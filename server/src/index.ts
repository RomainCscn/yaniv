import * as express from 'express';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';

import { handleWebSocketClosed } from './core/network';
import { Room } from './core/room';
import rooms from './core/rooms';
import handleMessage from './handlers';
import { getData } from './helpers';
import logger from './logger';
import { CustomWebSocket } from './types';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: CustomWebSocket) => {
  const sessionUuid = uuidv4();
  logger.info({ sessionUuid }, 'Player connected');

  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', (message: string) => {
    const data = getData(message);

    if (!data) {
      return;
    }

    if (!rooms[data.roomId]) {
      rooms[data.roomId] = new Room(data.roomId);
    }

    handleMessage(rooms[data.roomId], { ...data, sessionUuid, ws });
  });

  ws.onclose = () => {
    logger.info({ sessionUuid }, 'WebSocket closed');

    handleWebSocketClosed(sessionUuid);
  };
});

const interval = setInterval(() => {
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

wss.on('close', () => {
  clearInterval(interval);
});

logger.info('Server started on port ', process.env.PORT || 8999);

server.listen(process.env.PORT || 8999);
