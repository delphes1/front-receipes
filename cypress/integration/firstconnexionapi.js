describe("connexion to the backend", () => { 
    it("connected with the backend", () => {
        cy.visit("/");
        
        cy.get('#checkapi').click()
        
        cy.intercept({
            method: 'POST',
            url: '/status',
          }).as('apiCheck')
        cy.wait('@apiCheck').then((interception) => {
        assert.isNotNull(interception.response.body, 'api ok')
        })
        cy.get(".App").should("exist");
    })
})
