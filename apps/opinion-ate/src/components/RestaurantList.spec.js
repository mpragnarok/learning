import {render, screen} from '@testing-library/react';
// unconnected component
import {RestaurantList} from './RestaurantList';
describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let loadRestaurants;
  function renderComponent() {
    loadRestaurants = jest.fn().mockName('loadRestaurants');
    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );
  }
  it('loads restaurants on first render', () => {
    // mock redux dispatch function
    renderComponent();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    renderComponent();
    expect(screen.getByText('Sushi Place')).toBeInTheDocument();
    expect(screen.getByText('Pizza Place')).toBeInTheDocument();
  });
});
