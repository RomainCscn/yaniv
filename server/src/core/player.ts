import { Card, CustomWebSocket, InitialPlayer, Sort } from '../types';

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
    this.hand.splice(
      this.hand.findIndex(
        (handCard: Card) => handCard.value == card.value && handCard.suit === card.suit,
      ),
      1,
    );
  }

  update(data: Partial<Player>): void {
    Object.assign(this, data);
  }
}
