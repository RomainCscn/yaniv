import { getCardValue } from './cards';
import { findCardIndex } from './helpers';
import { Card, CustomWebSocket, FormattedPlayer, InitialPlayer, MessageType, Sort } from '../types';

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

  addScore(scoreToAdd: number): void {
    this.score += scoreToAdd;
    this.scoreHistory.push(this.score);
  }

  format(): FormattedPlayer {
    return {
      avatar: this.avatar,
      numberOfCards: this.hand.length,
      score: this.score,
      scoreHistory: this.scoreHistory,
      sort: this.sort,
      username: this.username,
      uuid: this.uuid,
    };
  }

  handScore(): number {
    return this.hand.reduce((sum: number, card) => sum + getCardValue(card), 0);
  }

  hasLost(smallestScore: number): boolean {
    return smallestScore <= this.handScore();
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
