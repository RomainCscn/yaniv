import { getHand, getSuffledDeck } from './game/cards';
import {
  Card,
  CustomWebSocket,
  FormattedPlayer,
  Player,
  Players,
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

  addPlayer(
    { avatar, sessionUuid, sort, username, uuid }: Player,
    playerWs: CustomWebSocket,
  ): void {
    this.players[uuid] = {
      avatar,
      hand: [],
      score: 0,
      scoreHistory: [],
      sessionUuid,
      sort: sort || { order: 'asc', type: 'suit' },
      username,
      uuid,
      ws: playerWs,
    };
  }

  assignHandToPlayer(player: Player): void {
    const playerHand = getHand(this, player.sort);

    player.hand = playerHand;
    this.deck = this.deck.slice(this.configuration.handCardsNumber);
  }

  getFormattedPlayer(uuid: string): FormattedPlayer {
    const { avatar, hand, sort, username } = this.players[uuid];

    return {
      avatar,
      numberOfCards: hand.length,
      sort,
      username,
      uuid,
    };
  }

  getFormattedPlayers(): FormattedPlayer[] {
    return Object.values(this.players)
      .filter((player) => player.ws.readyState !== player.ws.CLOSED)
      .map((player) => ({
        avatar: player.avatar,
        numberOfCards: player.hand.length,
        sort: player.sort,
        uuid: player.uuid,
        username: player.username,
      }));
  }

  getPlayerByUuid(playerUuid: string): Player {
    return this.players[playerUuid];
  }

  getPlayersScore(): Pick<Player, 'score' | 'scoreHistory' | 'username' | 'uuid'>[] {
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

  updatePlayer(playerUuid: string, player: Partial<Player>): void {
    this.players[playerUuid] = { ...this.players[playerUuid], ...player };
  }
}
