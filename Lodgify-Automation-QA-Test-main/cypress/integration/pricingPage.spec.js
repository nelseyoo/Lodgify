import pricingPage from '../pages/pricingPage'

context('Lodgify Pricing Page Tests', () => {

  // Using this to ignore errors on the webpage
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  });

  it('Default option for currency selector should be USD', () => {
    cy.visit('http://localhost:8080/pricing.html');
    // Accept Cookies...
    cy.contains('Accept').click();
    // Noticed the default option for this is not USD even though the page displays in USD as default
    // Added an extra tests for this
    pricingPage.elements.currencySelector().should('have.value', 'usd');
  });

  //Add a test verifying that the "Yearly" plan selecting 50 rentals displays: $64 for Starter plan $375 for Professional plan $525 for Ultimate plan
  it('Verify yearly price plans for 50 rentals', () => {
    const  currencyUSD = '$'
    pricingPage.typeNumberOfRentals('50');
    pricingPage.elements.starterPlanSum().should('have.text', '64');
    pricingPage.elements.starterPlanCurrency().should('have.text', currencyUSD);
    pricingPage.elements.professionalPlanSum().should('have.text', '375');
    pricingPage.elements.professionalPlanCurrency().should('have.text', currencyUSD);
    pricingPage.elements.ultimatePlanSum().should('have.text', '525');
    pricingPage.elements.ultimatePlanCurrency().should('have.text', currencyUSD);
  });

  // Add a test to verify that the change of currency (located just below the pricing options) properly changes the currency of the pricing options.
  it('Prices should display in £ GBP after changing currency', () => {
    const  currencyGBP = '£'
    pricingPage.selectCurrency('£ GBP');
    pricingPage.elements.starterPlanSum().should('have.text', '51');
    pricingPage.elements.starterPlanCurrency().should('have.text', currencyGBP);
    pricingPage.elements.professionalPlanSum().should('have.text', '294');
    pricingPage.elements.professionalPlanCurrency().should('have.text', currencyGBP);
    pricingPage.elements.ultimatePlanSum().should('have.text', '414');
    pricingPage.elements.ultimatePlanCurrency().should('have.text', currencyGBP);
  });

  //Add a test to verify that the change of currency (located just below the pricing options) properly changes the currency of the pricing options.
  it('Prices should display in € EUR after changing currency', () => {
    const currencyEUR = '€'
    pricingPage.selectCurrency('€ EUR');
    pricingPage.elements.starterPlanSum().should('have.text', '60');
    pricingPage.elements.starterPlanCurrency().should('have.text', currencyEUR);
    pricingPage.elements.professionalPlanSum().should('have.text', '330');
    pricingPage.elements.professionalPlanCurrency().should('have.text', currencyEUR);
    pricingPage.elements.ultimatePlanSum().should('have.text', '466');
    pricingPage.elements.ultimatePlanCurrency().should('have.text', currencyEUR);
  });
})
