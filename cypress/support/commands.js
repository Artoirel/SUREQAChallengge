// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import HomePage from '../integration/HomePage'
import InputPages from '../integration/InputPages'
import QuotePages from '../integration/QuotePage'

const VALIDZIPLENGTH = 5


Cypress.Commands.add("validateErrorIsVisible", (check) => {
    const home = new HomePage()

    if (check)
    {
        home.getError().should('be.visible')
    }
    else
    {
        home.getError().should('be.not.visible')
    }

})

Cypress.Commands.add("enterZip", (zip) => {

    const home = new HomePage()

    home.getZipCode().type(zip)

})

Cypress.Commands.add("validateZipLength", (length=VALIDZIPLENGTH) => {

    const home = new HomePage()

    home.getZipCode().invoke('val').should('have.length', length)
})

Cypress.Commands.add("launchSite", () => {

    const home = new HomePage()

    home.openHome()

})

Cypress.Commands.add("submitZip", () => {

    const home = new HomePage()

    home.getSubmit().click()

})

Cypress.Commands.add("submitWithEnter", () => {

    const home = new HomePage()

    home.getZipCode().type('{enter}')

})

Cypress.Commands.add("selectBullet", (option) => {

    const build = new BuildingMaterials()

    build.getInput().get('[value=' + option + ']')

})
