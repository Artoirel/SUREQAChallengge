class HomePage
{
    url = "https://sure-qa-challenge.vercel.app/"

    getZipCode()
    {

        return cy.get('[name="postalCode"]')

    }

    getError()
    {

        return cy.get('.Mui-error')

    }

    getSubmit()
    {

        return cy.get('button').get('[type="submit"]')

    }

    openHome()
    {

        cy.visit(this.url)

    }

}

export default HomePage

