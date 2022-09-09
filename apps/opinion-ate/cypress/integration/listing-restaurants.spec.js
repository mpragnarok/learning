describe('Listing Restaurants', () => {
  it('shows restaurants from the server', () => {
    const sushiPlace = 'Sushi Place';
    const pizzaPlace = 'Pizza Place';
    // stub api request
    cy.intercept('GET', 'https://api.outsidein.dev/*/restaurants', [
      {id: 1, name: 'Sushi Place'},
      {id: 2, name: 'pizzaPlace'},
    ]);
    cy.visit('/');
    cy.contains(sushiPlace);
    cy.contains(pizzaPlace);
  });
});
