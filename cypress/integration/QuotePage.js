class QuotePage
{

    path = "/quote";

    getStandardQuote()
    {

        return cy.get('h3').contains('Standard').parent().siblings('div').find('h3')

    }

    getCompleteQuote()
    {

        return cy.get('h3').contains('Complete').parent().siblings('div').find('h3')

    }

    getExtraQuote()
    {

        return cy.get('label').get('.MuiFormControlLabel-label')

    }

    getCheckbox()
    {

        return cy.get('input');

    }

}

Cypress.Commands.add('validateQuotePath', () => {

    const quote = new QuotePage()

    cy.url().should('include', quote.path);

})

Cypress.Commands.add('checkStandardQuote', (value) => {

    const quote = new QuotePage();

    quote.getStandardQuote().should('contain', value)

})

Cypress.Commands.add('checkCompleteQuote', (value) => {

    const quote = new QuotePage();

    quote.getCompleteQuote().should('contain', value);

})

Cypress.Commands.add('checkExtraQuote', (value) => {

    const quote = new QuotePage();

    quote.getExtraQuote().should('contain', value)

})

Cypress.Commands.add('checkChecked', (value) => {

    const quote = new QuotePage();

    if(value)
    {
        quote.getCheckbox().should('be.checked')
    }
    else
    {
        quote.getCheckbox().should('not.be.checked')
    }

})

Cypress.Commands.add('clickCheckbox', (value) => {

    const quote = new QuotePage();

    quote.getCheckbox().click();

})

