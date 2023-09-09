// Before each test (it...) load .html page
beforeEach(() => {19-24 
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
 2. Replace text ‘Password123’ in the first test with your own chosen password (2 places) - passwords should match
 3. Change phone number in the first test to 555666777
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 5. Add comment to the first test containing today’s date
 */

 // 8/27/2023


 describe('This is first test suite, Daniil Todnem', () => {
    it('User can submit data only when valid mandatory values are added', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Smith')       
        cy.get('input[name="password"]').type('abcd')
        cy.get('[name="confirm"]').type('abcd')
        cy.get('#username').type('Somethsdfdfing')
        
        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        // next 2 lines check exactly the same, but using different approach
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        // Assert that success message is visible
        // next 2 lines check exactly the same, but using different approach
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
        })

    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123123')
        // type('{enter}') is clicking native button e.g to click backspace use '{backspace}'
        cy.get('[name="confirm"]').type('{enter}')

        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')

        // Assert that password error message is visible, and message should contain 'Passwords do not match!
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')
        // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Smith')       
        cy.get('input[name="password"]').type('abcd')
        cy.get('[name="confirm"]').type('abcd')
        cy.get('#username').type('Somethsdfdfing')

        // Scroll back to username input field and clear it
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('not.be.visible')
    })
})
    /*
    Assignment 3: add the content to the following tests
    */

describe('These are tests for assignment 3', () => {
    it('User cannot submit data when phone number is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Smith')       
        cy.get('input[name="password"]').type('abcd')
        cy.get('[name="confirm"]').type('abcd')
        cy.get('#username').type('Somethsdfdfing')
        
        // Clearing phone number and click
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that input error message is not visible
        cy.get('#input_error_message').should('not.be.visible')
    });
    it('User cannot submit data when password and/or confirmation password is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Smith')       
        cy.get('input[name="password"]').type('abcd')
        cy.get('#username').type('Somethsdfdfing')
        cy.get('input[name="password"]').type('abcd')
        cy.get('[name="confirm"]').type('abcd')
       
        // Clearing typed password confirmation and click
        cy.get('[name="confirm"]').clear()
        cy.get('h2').contains('Password').click()
       
        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that input error message is not visible
        cy.get('#input_error_message').should('not.be.visible')
    });
    it('User cannot add letters to phone number', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('Cerebrum Hub')
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Smith')       
        cy.get('input[name="password"]').type('abcd')
        cy.get('[name="confirm"]').type('abcd')
        cy.get('#username').type('Somethsdfdfing')

        // Click
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message is visible and contain given text
        cy.get('#input_error_message').should('not.be.visible')
        
        // Check that phone number input is numbers
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
    });
});    