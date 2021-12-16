class pricingPage {
    elements = {
        currencySelector: () => cy.get('.price-currency-select'),
        numberOfRentalsField: () => cy.get('[id=scroll-prop-plan]'),
        starterPlanSum: () => cy.get('.plan-price-2 > .total-sum'),
        starterPlanCurrency: () => cy.get('.plan-price-2 > .currency-symbol'),
        professionalPlanSum: () => cy.get('.plan-price-1 > .total-sum'),
        professionalPlanCurrency: () => cy.get('.plan-price-1 > .currency-symbol'),
        ultimatePlanSum: () => cy.get('.plan-price-3 > .total-sum'),
        ultimatePlanCurrency: () => cy.get('.plan-price-3 > .currency-symbol'),
    }

    selectCurrency(currency){
        this.elements.currencySelector().select(currency);
    }

    typeNumberOfRentals(numberOfRentals){
        this.elements.numberOfRentalsField().clear().type(numberOfRentals)
    }
}

module.exports = new pricingPage();
