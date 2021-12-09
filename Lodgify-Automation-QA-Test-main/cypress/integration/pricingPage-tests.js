context('Lodgify Pricing Page Tests', () => {

  // Using this to ignore errors on the webpage
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });

  it('Default option for currency selector should be USD', () => {
    cy.visit('http://localhost:8080/pricing.html');
    // Accept Cookies...
    cy.contains('Accept').click();
    // Noticed the default option for this is not USD even though the page displays in USD as default
    // Added an extra tests for this
    cy.get('.price-currency-select').should('have.value', 'usd');
  });

  //Add a test verifying that the "Yearly" plan selecting 50 rentals displays: $64 for Starter plan $375 for Professional plan $525 for Ultimate plan
  it('Verify yearly price plans for 50 rentals', () => {
    const  currencyUSD = '$'
    cy.get('[id=scroll-prop-plan]').clear().type('50');
    cy.get('.plan-price-2 > .total-sum').should('have.text', '64');
    cy.get('.plan-price-2 > .currency-symbol').should('have.text', currencyUSD);
    cy.get('.plan-price-1 > .total-sum').should('have.text', '375');
    cy.get('.plan-price-2 > .currency-symbol').should('have.text', currencyUSD);
    cy.get('.plan-price-3 > .total-sum').should('have.text', '525');
    cy.get('.plan-price-2 > .currency-symbol').should('have.text', currencyUSD);
  });

  // Add a test to verify that the change of currency (located just below the pricing options) properly changes the currency of the pricing options.
  it('Prices should display in £ GBP after changing currency', () => {
    const  currencyGBP = '£'
    cy.get('.price-currency-select').select('£ GBP');
    cy.get('.plan-price-2 > .total-sum').should('have.text', '51');
    cy.get('.plan-price-2 > .currency-symbol').should('have.text', currencyGBP);
    cy.get('.plan-price-1 > .total-sum').should('have.text', '294');
    cy.get('.plan-price-2 > .currency-symbol').should('have.text', currencyGBP);
    cy.get('.plan-price-3 > .total-sum').should('have.text', '414');
    cy.get('.plan-price-2 > .currency-symbol').should('have.text', currencyGBP);
  });

  //Add a test to verify that the change of currency (located just below the pricing options) properly changes the currency of the pricing options.
  it('Prices should display in € EUR after changing currency', () => {
    const currencyEUR = '€'
    cy.get('.price-currency-select').select('€ EUR');
    cy.get('.plan-price-2 > .total-sum').should('have.text', '60');
    cy.get('.plan-price-2 > .currency-symbol').should('have.text', currencyEUR);
    cy.get('.plan-price-1 > .total-sum').should('have.text', '330');
    cy.get('.plan-price-2 > .currency-symbol').should('have.text', currencyEUR);
    cy.get('.plan-price-3 > .total-sum').should('have.text', '466');
    cy.get('.plan-price-2 > .currency-symbol').should('have.text', currencyEUR);
  });
})
