

let buildOptions = ["straw", "sticks", "bricks"]
let waterOptions = ["true", "false"]

describe('Home Page', () => {
    beforeEach(() => {
        cy.launchSite()
    })

    // Validate that if the Zip Code is shorter than 5 digits in length
    // then we throw a validation error
    it('Zip Code Too Short', () => {

        cy.enterZip(Math.floor(Math.random() * 10000))

        cy.submitZip()

        cy.validateErrorIsVisible(true)

    })

    // Validate that if the Zip Code is longer than 5 digits in length
    // then we stop entering after 5 and can still proceed
    it('Zip Code Too Long', () => {

        cy.enterZip(Math.floor(Math.random() * 100000) + 100000);

        cy.validateZipLength();

        cy.submitZip();

        cy.validateErrorIsVisible(false);

    })

    // Validate that if letters are entered they are ignored
    it('Zip Code with Letters', () => {

        cy.enterZip("ZipCode");

        cy.validateZipLength(0);

        cy.submitZip();

        cy.validateErrorIsVisible(true);

    })

    // Validate if a letter is entered with the numbers that the
    // letter is still ignored
    it('Zip Code with Letters And Numbers', () => {

        let zip = Math.floor(Math.random() * 10000).toString()

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip("a" + zip);

        cy.validateZipLength();

        cy.submitZip();

        cy.validateErrorIsVisible(false);

    })

    // Validate if a letter is entered after a valid zip code that the
    // letter is still ignored
    it('Valid Zip Code Followed By Letters', () => {

        let zip = Math.floor(Math.random() * 10000).toString()

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip(zip + "a");

        cy.validateZipLength();

        cy.submitZip();

        cy.validateErrorIsVisible(false);

    })

    // Validate if a special character is entered that it is also ignored
    it('Zip Code With Symbol', () => {

        let zip = Math.floor(Math.random() * 10000).toString()

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip("&" + zip);

        cy.submitZip();

        cy.validateErrorIsVisible(true);

    })

    // Validate that if the field is empty there is a validation error
    // when submitting
    it('Empty Field', () => {

        cy.submitZip();

        cy.validateErrorIsVisible(true);

    })

    // Validate that if the field is empty there is a validation error
    // when submitting with Enter
    it('Empty Field with Enter Key', () => {

        cy.submitWithEnter();

        cy.validateErrorIsVisible(true);

    })

    // Validate that submission with Enter key navigates to the
    // buildingMaterials page. (Enter input too fast to validate no
    // validation error present)
    it('Submit With Enter Key', () => {

        let zip = Math.floor(Math.random() * 10000).toString()

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip(zip);

        cy.submitWithEnter();

        cy.validateBuildingPath();

    })

    it('Select Each Building Material', () => {

        let zip = Math.floor(Math.random() * 100000).toString()

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip(zip);

        cy.submitZip();

        cy.validateBuildingPath();

        for(let i = 0; i < buildOptions.length; i++)
        {

            cy.selectInputByName(buildOptions[i]);

            cy.validateChecked(buildOptions[i]);

            cy.validateUnchecked(buildOptions[(i + buildOptions.length - 1) % buildOptions.length])

        }

    })

    it('Select Option and Refresh', () => {

        let zip = Math.floor(Math.random() * 100000).toString()

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip(zip);

        cy.submitZip();

        cy.validateBuildingPath();

        for(let i = 0; i < buildOptions.length; i++)
        {

            cy.selectInputByName(buildOptions[i]);

            cy.reload();

            cy.validateChecked(buildOptions[i]);

        }

    })

    it('Select No Option and Attempt to Proceed', () => {

        let zip = Math.floor(Math.random() * 100000).toString()

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip(zip);

        cy.submitZip();

        cy.validateBuildingPath();

        cy.clickNext();

        cy.validateBuildingPath();

    })

    it('Click Options and Navigate to Next Page', () => {

        let zip = Math.floor(Math.random() * 100000).toString();

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip(zip);

        cy.submitZip();

        cy.validateBuildingPath();

        for(let i = 0; i < buildOptions.length; i++)
        {

            cy.selectInputByName(buildOptions[i]);

            cy.validateChecked(buildOptions[i]);

            cy.clickNext();

            cy.validateWaterPath();

            cy.go('back');

        }

    })

    it('Select Option and Refresh - Water Proximity', () => {

        let zip = Math.floor(Math.random() * 100000).toString()

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip(zip);

        cy.submitZip();

        cy.validateBuildingPath();

        cy.selectInputByName(buildOptions[0]);

        cy.clickNext();

        for(let i = 0; i < waterOptions.length; i++)
        {

            cy.selectInputByName(waterOptions[i]);

            cy.reload();

            cy.validateChecked(waterOptions[i]);

        }

    })

    it('Click Options and Navigate to Next Page - Water Proximity', () => {

        let zip = Math.floor(Math.random() * 100000).toString();

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip(zip);

        cy.submitZip();

        cy.validateBuildingPath();

        cy.selectInputByName(buildOptions[0]);

        cy.clickNext();

        for(let i = 0; i < waterOptions.length; i++)
        {

            cy.selectInputByName(waterOptions[i]);

            cy.validateChecked(waterOptions[i]);

            cy.clickNext();

            cy.validateQuotePath();

            cy.go('back');

        }

    })

    it('Validate Values Displayed on Quote and function', () => {

        let zip = Math.floor(Math.random() * 100000).toString();

        for(let i = zip.length; i < 5; i++)
        {
            zip = "0" + zip;
        }

        cy.enterZip(zip);

        cy.submitZip();

        cy.validateBuildingPath();

        cy.selectInputByName(buildOptions[0]);

        cy.clickNext();

        cy.selectInputByName(waterOptions[0]);

        cy.clickNext();

        cy.request({
            method: 'POST',
            url: 'https://sure-qa-challenge.vercel.app/api/quote',
            body: {
                "buildingMaterial" : buildOptions[0],
                "postalCode" : zip,
                "waterProximity" : waterOptions[0]
            }
        }).then((response) => {

            cy.log(response.body.quote.floodProtection)

            cy.checkStandardQuote(response.body.quote.plans.standard.price);

            cy.checkCompleteQuote(response.body.quote.plans.complete.price);

            cy.checkExtraQuote(response.body.quote.floodProtection.price)

            cy.checkChecked(response.body.quote.floodProtection.includedByDefault)

            cy.clickCheckbox()

            cy.checkChecked(!response.body.quote.floodProtection.includedByDefault)

            cy.reload()

            cy.checkChecked(!response.body.quote.floodProtection.includedByDefault)

        })

    })



})

