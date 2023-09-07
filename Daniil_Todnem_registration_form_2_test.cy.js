beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('Tester1')
        cy.get('#email').type('test@mail.com')
        cy.get('.input').eq(2).type('FirstName')
        cy.get('#lastName').type('LastName')
        cy.get('[data-testid="phoneNumberTestId"]').type('12345678')
        cy.get('#password').type('abcd')
        cy.get('#confirm').type('abcd1')
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('h2').eq(0).click()
        cy.get('#password_error_message').should('be.visible')
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('Tester1')
        cy.get('#email').type('test@mail.com')
        cy.get('.input').eq(2).type('FirstName')
        cy.get('#lastName').type('LastName')
        cy.get('[data-testid="phoneNumberTestId"]').type('12345678')
        cy.get('#password').type('abcd')
        cy.get('#confirm').type('abcd')
        cy.get('#htmlFavLanguage').click()
        cy.get('#vehicle2').click()
        cy.get('#animal').select(1)
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('anything') //this function takes data from lines 71-82 (preset data for autocompletion)
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User cannot submit if phone number is missing', ()=>{
        inputValidData('anything')
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        
        /*If phone number is cleared after valid data input, submit button still remains enabled, 
        And if submit button is clicked there is no response (no error or success message).
        In order to get submit button disabled we need to click elsewhere on the page, so we could use this:*/
        cy.get('h2').eq(0).click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        
        /*
        If we skip the lines of code above, we would still have submit button active, 
        so to make sure that it doesn't actually submit anything we have to test it replacing lines 55-57 with:

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('not.be.visible')
        */

    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}


/*
Assignement 5
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        //Get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        cy.log('Will ceck that cypress logo is correct and has correct size')
        cy.get("img").eq(1).should('have.attr', 'src').should('include', 'cypress_logo')
        //Checking width and height
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 89).and('be.greaterThan', 87)
        cy.get('img').eq(1).invoke('width').should('be.lessThan', 117).and('be.greaterThan', 115)
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        //Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        //Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        //Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
        //Second nav link test
    it('Check navigation part for second link', () => {
        cy.get('nav').children().should('have.length', 2) 
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'registration_form_3.html').click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back at registration form 2')
    });

    it('Check that radio button list is correct', () => {
        //Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        //Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that check boxes list is correct', () => {
        //Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
       
        //Verify labels of the check boxes 
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        //Verify default state of check boxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        //One check box can be checked and will stay checked
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        //Two check boxes can be checked and will stay checked
        //reseting the page to default
        cy.reload()
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        //Asserting that third check box is not checked
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        //Multiple checkboxes can be checked and will stack checked
        //reseting the page to default
        cy.reload()
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
    })


    it('Car dropdown is correct', () => {
        //Here is an example how to explicitely create screenshot from the code
        //Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        //Here are given different solutions how to get the length of array of elements in Cars dropdown
        //Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        //Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    it('Animal dropdown is correct', () => {
        cy.get('#animal').select(2).screenshot('Animal dropdown screenshot')
        cy.screenshot('Full page screenshot')

        //Here are given different solutions how to get the length of array of elements in animals dropdown
        //Next 2 lines of code do exactly the same!
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        
        //Check that third element in the dropdown has text Snake
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        
        //Advanced level how to check the content of the animal dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse']) // noticed that in html actual value of a horse is 'mouse'
        })
    })


})
