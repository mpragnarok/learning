import {render, screen} from '@testing-library/react';
// unconnected component
import {RestaurantList} from './RestaurantList';
const restaurants = [
  {id: 1, name: 'Sushi Place'},
  {id: 2, name: 'Pizza Place'},
];
let loadRestaurants;
function renderComponent(propOverrides = {}) {
  const props = {
    loadRestaurants: jest.fn().mockName('loadRestaurants'),
    restaurants,
    loading: false,
    ...propOverrides,
  };
  loadRestaurants = props.loadRestaurants;
  render(<RestaurantList {...props} />);
}
describe('RestaurantList', () => {
  it('loads restaurants on first render', () => {
    // mock redux dispatch function
    renderComponent();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the loading indicator while loading', () => {
    renderComponent({loading: true});
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});

describe('when loading succeeds', () => {
  it('does not display the error message', () => {
    renderComponent();
    expect(
      screen.queryByText('Restaurants could not be loaded.'),
    ).not.toBeInTheDocument();
  });
  it('displays the restaurants', () => {
    renderComponent();
    expect(screen.getByText('Sushi Place')).toBeInTheDocument();
    expect(screen.getByText('Pizza Place')).toBeInTheDocument();
  });
  it('does not display the loading indicator while not loading', () => {
    renderComponent();
    // queryByRole return null if an element is not found, getByRole throws an error
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});

describe('when loading fails', () => {
  it('displays the error message while loading', () => {
    renderComponent({loadError: true});
    expect(
      screen.getByText('Restaurants could not be loaded.'),
    ).toBeInTheDocument();
  });
});
