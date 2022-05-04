describe("render the home page", () => { 
    it("render correctly", () => {
        cy.visit("/");
        cy.get(".App").should("exist");
    })
})