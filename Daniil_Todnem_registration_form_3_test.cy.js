beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */
describe('This is visual test suite for registration form 3', () => {
    it('Check that radio button list is correct', () => {
        //verify that there are 4 options
        cy.get('input[type="radio"]').should('have.length', 4) 
        //verify that button names are correct
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily') 
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')
        //verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        //verify that radio buttons behave correctly, only one option at the time
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    });
    it('Check dropdown contents for country', () => {
        //verify that dropdown has only 4 options
        cy.get('#country').find('option').should('have.length', 4)
        //check that first element in the dropdown has no text
        cy.get('#country').find('option').eq(0).should('not.have.text')
        //verify that the second element has text Spain
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        //verify that all dropdown elements are in place
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'object:3', 'object:4', 'object:5'])            

        });

    });
    it('Verify that country and city are blank by default', () => {
        cy.reload()
        cy.get('#country').should('not.have.text')
        //check that city dropdown has no text
        cy.get('#city').should('not.have.text')
    });

    it('Verify that if country is chosen to be blank city list is empty', () => {
        cy.get('#country').eq(0)
        //check that city dropdown has no text
        cy.get('#city').should('not.have.text')
    });

    it('Check the city contents of Spain are correct', () => {
        //in order to see the dropdown for Spain we need to select it
        cy.get('#country').select('Spain')
        //check that there are only 5 options of cities
        cy.get('#city').find('option').should('have.length', 5)
        //we can verify multiple options by listing them in the order we want
        cy.get('#city').find('option').eq(1, 2, 3, 4).should('have.text', 'Malaga', 'Madrid', 'Valencia', 'Corralejo')
        //verify that first option is blank
        cy.get('#city').find('option').eq(0).should('not.have.text')

        //verify that all dropdown elements are in place 
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Malaga', 'string:Madrid', 'string:Valencia', 'string:Corralejo'])   
        });
        //reset back to blank
        cy.get('#country').select('')
        //check if city list is blank
        cy.get('#city').should('not.have.text')
    });
    it('Check the city contents of Estonia are correct', () => {
        //in order to see the dropdown for Spain we need to select it
        cy.get('#country').select('Estonia')
        //check that there are only 4 options of cities
        cy.get('#city').find('option').should('have.length', 4)
        //we can verify multiple options by listing them in the order we want
        cy.get('#city').find('option').eq(1, 2, 3,).should('have.text', 'Tallinn', 'Haapsalu', 'Tartu',)
        //verify that first option is blank
        cy.get('#city').find('option').eq(0).should('not.have.text')
        //verify that all dropdown elements are in place 
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Tallinn', 'string:Haapsalu', 'string:Tartu'])   
        });
        //reset back to blank
        cy.get('#country').select('')
        //check if city list is blank
        cy.get('#city').should('not.have.text')
    });
    it('Check the city contents of Austria are correct', () => {
        //in order to see the dropdown for Spain we need to select it
        cy.get('#country').select('Austria')
        //check that there are only 4 options of cities
        cy.get('#city').find('option').should('have.length', 4)
        //we can verify multiple options by listing them in the order we want
        cy.get('#city').find('option').eq(1, 2, 3,).should('have.text', 'Vienna', 'Salzburg', 'Innsbruck')
        //verify that first option is blank
        cy.get('#city').find('option').eq(0).should('not.have.text')
        //verify that all dropdown elements are in place 
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Vienna', 'string:Salzburg', 'string:Innsbruck'])   
        });
        //reset back to blank
        cy.get('#country').select('')
        //check if city list is blank
        cy.get('#city').should('not.have.text')
    });
    it('Check that check boxes list is correct', () => {
        //check that there are 2 checkboxes in total
        cy.get('input[type="checkbox"]').should('have.length', 2)
        //check if checkboxes have correct labels... since checkboxes dont have labels we could test div contents  
        cy.get('a').should('have.attr', 'href', 'cookiePolicy.html').should('have.text', 'Accept our cookie policy')
        cy.get('div').eq(10).should('include.text', 'Accept our privacy policy')
        //Multiple checkboxes can be ticked
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
    })
    it('Check navigation part for accepting cookie policies link', () => {
        cy.get('a').should('be.visible').and('have.attr', 'href', 'cookiePolicy.html').click()
        cy.url().should('contain', '/cookiePolicy.html')
        cy.go('back')
        cy.log('Back at registration form 3')
    });
    it('Check navigation part for file submission link', () => {
        cy.get('input[type="submit"]').eq(0).should('be.visible').click()
        cy.url().should('contain', '/upload_file.html')
        cy.go('back')
        cy.log('Back at registration form 3')
    });
    it('Email format check', () => {
        //using not allowed characters 
        cy.get('input[type="email"]').type('////')
        cy.get('span').contains('Invalid email address')
        //clearing input to see error msg
        cy.get('input[type="email"]').clear()
        cy.get('span').contains('Email is required.')
        //using wrong type of format
        cy.get('input[type="email"]').type('email.com')
        cy.get('span').contains('Invalid email address')
    });
})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */