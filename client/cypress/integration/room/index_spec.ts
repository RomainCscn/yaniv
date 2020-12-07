/// <reference types="Cypress" />

describe('Lobby', () => {
  describe('Players', () => {
    let client;

    beforeEach(() => {
      client = new WebSocket('ws://localhost:8999/');

      client.onopen = () =>
        client.send(
          JSON.stringify({
            roomId: 'room123',
            action: 'JOIN',
            actionType: 'JOINED_LOBBY',
            player: { username: 'toto', avatar: 'hippo', uuid: '' },
          }),
        );
    });

    afterEach(() => client.close());

    it('should display 7 cards', () => {
      cy.visit('localhost:3000/room123');
      cy.getBySel('startButton').click();
      cy.getBySelLike('hand').getBySelLike('hand-card-').should('have.length', 7);
    });

    it('should display 5 cards after room update', () => {
      cy.visit('localhost:3000/room123');
      cy.getBySel('cards-5').click();
      cy.getBySel('updateRoom').click();
      cy.getBySel('startButton').click();
      cy.getBySelLike('hand').getBySelLike('hand-card-').should('have.length', 5);
    });
  });
});
