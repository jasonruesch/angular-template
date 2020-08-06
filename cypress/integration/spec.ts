it('loads examples', () => {
  const baseUrl = 'http://localhost:4200';
  cy.visit(baseUrl);
  cy.contains('project-name app is running!');
});
