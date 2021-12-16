import contactPage from '../pages/contactPage'

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


  it('Should have the right title', () => {
    cy.visit('http://localhost:8080/Contact.html');
    cy.title().should('include', 'Contact');
  });

  // On "Contact" page, add a test to verify that the field validations appear according to the following requirements.  
  // "Name" is mandatory and a message should be displayed in case this field is left empty 
  // "Email address" is mandatory and a message should be displayed in case this field is left empty 
  // "Comment" is mandatory and a message should be displayed in case this field is left empty 
  // "Phone number" is mandatory and a message should be displayed in case this field is left empty 
  it('The fields: Name, Email, Comment, Phone should be required', () => {
    contactPage.clickSendButton();
    contactPage.elements.nameField().should('have.class', 'ui red pointing below label').and('have.text', 'Name is mandatory');
    contactPage.elements.emailField().should('have.class', 'ui red pointing below label').and('have.text', 'Email is mandatory');
    contactPage.elements.commentField().should('have.class', 'ui red pointing below label').and('have.text', 'Comment is mandatory');
    contactPage.elements.phoneField().should('have.class', 'ui red pointing below label').and('have.text', 'Phone is mandatory');
  });
  
  // This test should pick the date of arrival "April 14th" and date of departure "June 14" to verify the datepicker is working as expected 
  it('Datepicker should select dates of arrival and departure', () => {
    contactPage.clickDatePicker();
    contactPage.selectDates('April 2022', 'Thursday, April 14, 2022', 'June 2022', 'Tuesday, June 14, 2022');
  });

  // Add a random Lorem Ipsum of your choice to "Comment" field
  it('Add text to the Comment field', () => {
    contactPage.typeComment(testData.commentValue);
    contactPage.elements.commentField().clear();
  });
})
