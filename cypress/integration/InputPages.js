class InputPages
{

    buildPath = "/building-material"
    waterPath = "/water-proximity"

    getInput()
    {
        return cy.get('input')
    }

    getSubmit()
    {

        return cy.get('button').get('[type="submit"]')

    }

}

Cypress.Commands.add("clickNext", () => {

    const build = new InputPages()

    build.getSubmit().click();


})

Cypress.Commands.add("validateBuildingPath", () => {

    const build = new InputPages()

    cy.url().should('include', build.buildPath)

})

Cypress.Commands.add("validateWaterPath", () => {

    const build = new InputPages()

    cy.url().should('include', build.waterPath)

})



Cypress.Commands.add("selectInputByName", (name) => {

    const build = new InputPages()

    build.getInput().get('[value=' + name + ']').as("currInput").click();

})

Cypress.Commands.add("validateUnchecked", (name) => {

    const build = new InputPages()

    build.getInput().get('[value=' + name + ']').as("currInput");

    cy.get("@currInput").parent().parent('.Mui-checked').should('not.exist')

})

Cypress.Commands.add("validateChecked", (name) => {

    const build = new InputPages()

    build.getInput().get('[value=' + name + ']').as("currInput");

    cy.get("@currInput").parent().parent('.Mui-checked').should('exist')

})

export default InputPages

