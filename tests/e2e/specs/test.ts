describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.findByText("Welcome to Your Vue.js + TypeScript App");
  });
});
