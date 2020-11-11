import * as express from 'express';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';

import {
  handleJoin,
  handlePlay,
  handleReadyToPlay,
  handleStart,
  handleUpdate,
} from './controllers';
import { handleWebSocketClosed } from './core/network';
import { CustomWebSocket } from './types';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: CustomWebSocket) => {
  const userUuid = uuidv4();
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', (data: string) => {
    const {
      action,
      actionType,
      avatar,
      notPickedCards,
      pickedCard,
      room: roomId,
      thrownCards,
      username,
    } = JSON.parse(data);

    if (action === 'JOIN') {
      handleJoin(actionType, avatar, roomId, username, userUuid, ws);
    } else if (action === 'UPDATE') {
      handleUpdate(roomId, userUuid, { avatar, username });
    } else if (action === 'START') {
      handleStart(roomId);
    } else if (action === 'READY_TO_PLAY') {
      handleReadyToPlay(roomId, userUuid);
    } else if (action === 'PLAY') {
      handlePlay(actionType, { notPickedCards, pickedCard, thrownCards }, roomId, userUuid);
    }
  });

  ws.onclose = () => {
    handleWebSocketClosed(userUuid);
  };
});

const interval = setInterval(() => {
  wss.clients.forEach((ws: WebSocket) => {
    const customWs = ws as CustomWebSocket;

    if (!customWs.isAlive) return customWs.terminate();

    customWs.isAlive = false;
    customWs.ping(null, undefined);
  });
}, 10000);

wss.on('close', () => {
  clearInterval(interval);
});

server.listen(process.env.PORT || 8999);
