import { findCardIndex } from './helpers';
import { Card, CustomWebSocket, InitialPlayer, MessageType, Sort } from '../types';

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

  constructor(player: InitialPlayer, ws: CustomWebSocket) {
    Object.assign(this, player);
    this.ws = ws;
  }

  removeCardFromHand(card: Card): void {
    this.hand.splice(findCardIndex(this.hand, card), 1);
  }

  send({ data, type }: { data?: Record<string, unknown>; type: MessageType }): void {
    this.ws.send(JSON.stringify({ type, ...data }));
  }

  update(data: Partial<Player>): void {
    Object.assign(this, data);
  }
}
