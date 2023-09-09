beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})
/*
BONUS TASK: add visual tests for registration form 3
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
 */
        //inserting a function that will fill in all fields
function inputValidData(username) {
    cy.log('All fields will be filled')
    cy.get('#name').type(username)
    cy.get('input[type="email"]').type('validemail@yeap.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.get('input[type="date"]').eq(0).type('2023-06-06')
    cy.get('#birthday').type('2001-01-01')
    cy.get('input[type="checkbox"]').eq(0).check()
    cy.get('input[type="checkbox"]').eq(1).check()
}

describe('These are functional tests for registration form 3', () => {
    it('All fields are filled in and validated, submission is sucessfull', () => {
        inputValidData('Tester1')
        //added radio button here because it cannot be unclicked
        cy.get('input[type="radio"]').eq(0).click()
        cy.get('input[type="submit"]').eq(1).should('be.enabled')
        //asserting that there is no errors
        cy.get('span').contains('Email is required.').should('not.be.visible')
        cy.get('span').contains('Invalid email address').should('not.be.visible')
        cy.get('input[type="submit"]').eq(1).click()
        //asserting that submit button takes user to correct destination
        cy.url().should('contain', '/upload_file.html')    
        //asserting that success message is visible
        cy.get('h1').contains('Submission received').should('be.visible')  
    });
    it('Only mandatory fields are filled in, submission is sucessfull', () => {
        inputValidData('Tester1')
        //clearing optional fields
        cy.get('#name').clear()
        cy.get('input[type="date"]').clear()
        cy.get('#birthday').clear()
        //asserting that there is no errors
        cy.get('input[type="submit"]').eq(1).should('be.enabled')
        cy.get('span').contains('Email is required.').should('not.be.visible')
        cy.get('span').contains('Invalid email address').should('not.be.visible')
        cy.get('input[type="submit"]').eq(1).click()
        //asserting that submit button takes user to correct destination
        cy.url().should('contain', '/upload_file.html')      
        //asserting that success message is visible
        cy.get('h1').contains('Submission received').should('be.visible')
    });
    it('Email is absent, submission unsuccsessfull', () => {
        inputValidData('Tester1')
        cy.get('input[type="email"]').clear()
        //clearing optional fields
        cy.get('#name').clear()
        cy.get('input[type="date"]').clear()
        cy.get('#birthday').clear()
        cy.get('input[type="checkbox"]').eq(1).uncheck()
        //asserting that there is no errors
        cy.get('input[type="submit"]').eq(1).should('be.disabled')
        cy.get('h2').click
        cy.get('span').contains('Email is required.').should('be.visible')
        cy.get('span').contains('Invalid email address').should('not.be.visible')
    });
    it('Country is absent, submission unsuccsessfull', () => {
        inputValidData('Tester1')
        cy.get('#country').select('')
        //clearing optional fields
        cy.get('#name').clear()
        cy.get('input[type="date"]').clear()
        cy.get('#birthday').clear()
        cy.get('input[type="checkbox"]').eq(1).uncheck()
        //asserting that there is no errors
        cy.get('input[type="submit"]').eq(1).should('be.disabled')
        cy.get('h2').click
        cy.get('span').contains('Email is required.').should('not.be.visible')
        cy.get('span').contains('Invalid email address').should('not.be.visible')
    });
    it('Accepting policies confirmation is absent, submission unsuccsessfull', () => {
        inputValidData('Tester1')
        cy.get('input[type="checkbox"]').eq(0).uncheck()
        //clearing optional fields
        cy.get('#name').clear()
        cy.get('input[type="date"]').clear()
        cy.get('#birthday').clear()
        cy.get('input[type="checkbox"]').eq(1).uncheck()
        //asserting that there is no errors
        cy.get('input[type="submit"]').eq(1).should('be.disabled')
        cy.get('h2').click
        cy.get('span').contains('Email is required.').should('not.be.visible')
        cy.get('span').contains('Invalid email address').should('not.be.visible')
    });
    it('If city is already chosen and country is updated, then city choice should be removed', () => {
        inputValidData('Tester1')
        //chosing another country
        cy.get('#country').select('Spain')
        //asserting that city has been disselected
        cy.get('#city').should('not.be.checked')
        //asserting that there is no errors
        cy.get('input[type="submit"]').eq(1).should('be.disabled')
        cy.get('h2').click
        cy.get('span').contains('Email is required.').should('not.be.visible')
        cy.get('span').contains('Invalid email address').should('not.be.visible')
    });
    it('Uploading a file is successful', () => {
        inputValidData('Tester1');
        //uploading a file using functions, chatgtp suggestion (in order for this to work foo.txt is located in fixtures folder)
        const fileName = 'foo.txt';
        const fileType = 'text/plain';
        const filePath = `/${fileName}`; 
      
        cy.fixture(filePath, 'base64').then((fileContent) => {
          const blob = Cypress.Blob.base64StringToBlob(fileContent, fileType);
          const file = new File([blob], fileName, { type: fileType });
      
          cy.get('#myFile').then((input) => {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
      
            input[0].files = dataTransfer.files;
            cy.wrap(input).trigger('change', { force: true });
          });
        });
        //click submit
        cy.get('input[type="submit"]').eq(1).click()
        //check that we are redirected
        cy.url().should('contain', '/upload_file.html')   
        //asserting that success message is visible
        cy.get('h1').contains('Submission received').should('be.visible')
      });
});