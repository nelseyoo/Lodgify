class contactPage {
    elements = {
        sendButton: () => cy.get('[data-testid=form] > [data-testid=button]'),
        nameField: () => cy.get(':nth-child(1) > :nth-child(1) > .input > .ui'),
        emailField: () => cy.get('.eight > .input > .ui'),
        commentField: () => cy.get('.input > textarea'),
        phoneField: () => cy.get('[data-testid=phone-input]'),
        datePicker: () => cy.get('.DateRangePickerInput_calendarIcon'),
        callendarMonthText: () => cy.get(':nth-child(2) > .CalendarMonth > .CalendarMonth_caption').invoke('text')
    }

    clickSendButton(){
        this.elements.sendButton().click();
    }

    clickDatePicker(){
        this.elements.datePicker().click();
    }

    selectDates(){
        this.elements.callendarMonthText().then((text) => {
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
            this.selectDates();
        })
    }

    typeComment(comment){
        this.elements.commentField().type(comment);
    }

    
}

module.exports = new contactPage();
