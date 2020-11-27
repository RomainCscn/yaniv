import { getHand, getSuffledDeck } from './cards';
import { Player } from './player';
import {
  Card,
  CustomWebSocket,
  FormattedPlayer,
  InitialPlayer,
  MessageType,
  Players,
  PlayerScore,
  RoomConfiguration,
} from '../types';

export class Room {
  activePlayer: string | null = null;
  configuration: RoomConfiguration = { handCardsNumber: 7, scoreLimit: 200 };
  deck: Card[] = getSuffledDeck();
  players: Players = {};
  roomId = '';
  roundWinner: string | null = null;
  thrownCards: Card[] = [];

  constructor(roomId: string) {
    this.roomId = roomId;
  }

  addPlayer(player: InitialPlayer & { sessionUuid: string }, ws: CustomWebSocket): void {
    this.players[player.uuid] = new Player(player, ws);
  }

  assignHandToPlayer(player: Player): void {
    const playerHand = getHand(this, player.sort);

    player.hand = playerHand;
    this.deck = this.deck.slice(this.configuration.handCardsNumber);
  }

  dispatch({ data, type }: { data?: Record<string, unknown>; type: MessageType }): void {
    Object.values(this.players).forEach((player) => player.send({ type, data }));
  }

  dispatchMultiple(messages: { data?: Record<string, unknown>; type: MessageType }[]): void {
    Object.values(this.players).forEach((player) => {
      messages.forEach(({ type, data }) => player.send({ type, data }));
    });
  }

  getActivePlayers(): Record<string, Player> {
    return Object.fromEntries(
      Object.entries(this.players).filter(
        ([, player]) => player.ws.readyState !== player.ws.CLOSED,
      ),
    );
  }

  getFormattedPlayer(uuid: string): FormattedPlayer {
    return this.players[uuid].format();
  }

  getFormattedPlayers(): FormattedPlayer[] {
    return Object.values(this.players)
      .filter((player) => player.ws.readyState !== player.ws.CLOSED)
      .map((player) => player.format());
  }

  getPlayers(): Player[] {
    return Object.values(this.players);
  }

  getPlayersUuid(): string[] {
    return Object.keys(this.players);
  }

  getPlayerByUuid(playerUuid: string): Player {
    return this.players[playerUuid];
  }

  getPlayersScore(): PlayerScore[] {
    return Object.entries(this.players).map(([uuid, player]: [string, Player]) => ({
      score: player.score,
      scoreHistory: player.scoreHistory,
      uuid,
      username: player.username,
    }));
  }

  getPlayerUuidBySessionUuid(sessionUuid: string): string | undefined {
    return Object.values(this.players).find((player) => player.sessionUuid === sessionUuid)?.uuid;
  }

  getSortedThrownCards(): Card[] {
    let sortedCards: Card[] = [];
    const jokerCard = this.thrownCards.find((c: Card) => c.suit === 'joker');

    if (!jokerCard) {
      sortedCards = this.thrownCards.sort((a, b) => a.value - b.value);
    } else {
      sortedCards = this.thrownCards
        .filter((c) => c.suit !== 'joker')
        .sort((a, b) => a.value - b.value);

      const cardGapIndex =
        sortedCards.findIndex(
          (card, index) =>
            sortedCards[index + 1] && card.value + 2 === sortedCards[index + 1].value,
        ) + 1; // + 1 here because we removed the joker (in case of J 2 4 cards where J = 98 or 99)

      sortedCards.splice(cardGapIndex, 0, jokerCard);
    }

    return sortedCards;
  }

  reset({ resetScore = false, resetActivePlayer = false } = {}): void {
    this.deck = getSuffledDeck();
    this.thrownCards = [];
    this.activePlayer = resetActivePlayer ? null : this.roundWinner || Object.keys(this.players)[0];
    this.roundWinner = null;

    if (resetScore) {
      Object.entries(this.players).forEach(([, player]) => {
        player.score = 0;
        player.scoreHistory = [];
      });
    }
  }

  scoreLimit(): number {
    return this.configuration.scoreLimit;
  }

  updatePlayer(playerUuid: string, player: Partial<Player>): void {
    this.players[playerUuid].update(player);
  }
}
