/// <reference types="Cypress" />

describe('Lobby', () => {
  describe('Language', () => {
    it('should display language selector', () => {
      cy.visit('localhost:3000');
      cy.contains('English');
      cy.contains('Français');
    });

    it('should change language to french', () => {
      cy.visit('localhost:3000');
      cy.getBySel('shareText').contains('Share this link to your friends so they can join you');
      cy.contains('Français').click();
      cy.getBySel('shareText').contains("Partagez ce lien à vos amis pour qu'ils vous rejoignent");
    });
  });

  describe('Share link', () => {
    it('should display link to share', () => {
      cy.visit('localhost:3000/room123');
      cy.getBySel('shareLink').contains('localhost:3000/room123');
    });
  });

  describe('Players', () => {
    let client;

    beforeEach(() => {
      if (client) {
        client.close();
      }

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

    it('should display two players', () => {
      cy.visit('localhost:3000/room123');

      cy.getBySelLike('player-').contains('toto');
      cy.getBySelLike('player-').contains('(you)');
      cy.getBySel('player-2').should('not.exist');
    });
  });

  describe('Profile', () => {
    it('should update the player username', () => {
      cy.visit('localhost:3000/room123');
      cy.getBySel('username').clear().type('Romain');
      cy.getBySel('updateProfile').click();
      cy.getBySelLike('player-').contains('Romain (you)');
    });

    it('should update the player avatar', () => {
      cy.visit('localhost:3000/room123');
      cy.getBySel('cat').click();
      cy.getBySel('updateProfile').click();
      cy.getBySel('player-avatar-cat').should('exist');
      cy.getBySel('player-avatar-hippo').should('not.exist');
      cy.getBySel('hippo').click();
      cy.getBySel('updateProfile').click();
      cy.getBySel('player-avatar-hippo').should('exist');
    });
  });
});
