import { Card, CustomWebSocket, Sort } from '../types';

export class Player {
  avatar = '';
  hand: Card[] = [];
  score = 0;
  scoreHistory: number[] = [];
  sessionUuid = '';
  sort: Sort = { order: 'asc', type: 'suit' };
  username = '';
  uuid = '';
  ws: CustomWebSocket;

  constructor(player: Player, ws: CustomWebSocket) {
    Object.assign(this, player);
    this.ws = ws;
  }
}
