import * as express from 'express';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';

import { handleJoin, handlePlay, handleReadyToPlay, handleStart } from './controllers';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  const userUuid = uuidv4();

  ws.on('message', (data: string) => {
    const { action, actionType, card, cards, room: roomName, username } = JSON.parse(data);

    if (action === 'JOIN') {
      handleJoin(actionType, roomName, username, userUuid, ws);
    } else if (action === 'START') {
      handleStart(roomName);
    } else if (action === 'READY_TO_PLAY') {
      handleReadyToPlay(roomName);
    } else if (action === 'PLAY') {
      handlePlay(actionType, card, cards, roomName, userUuid);
    }
  });
});

server.listen(process.env.PORT || 8999);
