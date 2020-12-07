/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, args?: any): Chainable<Element>;
    getBySelLike(selector: string, args?: any): Chainable<Element>;
  }
}
