/*eslint-disable */
describe('First', function () {
  it('Back button should take user back to document list', function() {
    cy.visit('http://localhost:8080')

    cy.contains('Start').click()

    cy.contains('Start').should('not.exist')
  })
})