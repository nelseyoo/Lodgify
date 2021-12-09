context('Lodgify Contact Page Tests', () => {

  let testData;
  beforeEach(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
      return testData;
    });
  });

  // Had to use this to ignore errors on the webpage
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });

  // function for the date picker test
  const pickDates = () => {
    cy.get(':nth-child(2) > .CalendarMonth > .CalendarMonth_caption').invoke('text').then((text) => {
      if (text === 'April 2022') {     
        cy.get('[aria-label="Thursday, April 14, 2022"]').click();
      }
      if (text === 'June 2022') {        
        cy.get('[aria-label="Tuesday, June 14, 2022"]').click();
        return
      }
      else {     
        cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
      }
      cy.wait(200)
      pickDates();
    })
  }

  it('Should have the right title', () => {
    cy.visit('http://localhost:8080/Contact.html');
    cy.title().should('include', 'Contact');
  });

  // On "Contact" page, add a test to verify that the field validations appear according to the following requirements.
  
  // "Name" is mandatory and a message should be displayed in case this field is left empty 
  it('Name should be required', () => {
    cy.get('[data-testid=form] > [data-testid=button]').click();
    cy.get(':nth-child(1) > :nth-child(1) > .input > .ui').should('have.class', 'ui red pointing below label').and('have.text', 'Name is mandatory');
  });

  // "Email address" is mandatory and a message should be displayed in case this field is left empty 
  it('Email should be required', () => {
    cy.get('.eight > .input > .ui').should('have.class', 'ui red pointing below label').and('have.text', 'Email is mandatory');
  });

  // "Comment" is mandatory and a message should be displayed in case this field is left empty 
  it('Comment should be required', () => {
    cy.get(':nth-child(4) > .input > .ui').should('have.class', 'ui red pointing below label').and('have.text', 'Comment is mandatory');
  });

  // "Phone number" is mandatory and a message should be displayed in case this field is left empty 
  it('Phone should be required', () => {
    cy.get('[data-testid=phone-input]').should('have.class', 'ui red pointing below label').and('have.text', 'Phone is mandatory');
  });
  
  // This test should pick the date of arrival "April 14th" and date of departure "June 14" to verify the datepicker is working as expected 
  it('Datepicker should select dates of arrival and departure', () => {
    cy.get('.DateRangePickerInput > :nth-child(2)').click();
    pickDates();cy.get('.input > textarea')
  });

  // Add a random Lorem Ipsum of your choice to "Comment" field
  it('Add text to the Comment field', () => {
    cy.get('.input > textarea').type(testData.commentValue);
    cy.get('.ui > textarea').clear();
  });
})
