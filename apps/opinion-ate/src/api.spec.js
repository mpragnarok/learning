import nock from 'nock';
import api from './api';

describe('api', () => {
  const responseHeaders = {'Access-Control-Allow-Origin': '*'};
  describe('loadRestaurants', () => {
    const restaurants = [{id: 1, name: 'Sushi Place'}];

    it('returns the response to the right endpoint', async () => {
      nock('https://api.outsidein.dev')
        .get(/^\/\w+\/restaurants$/)
        .reply(200, restaurants, responseHeaders);
      await expect(api.loadRestaurants()).resolves.toEqual(restaurants);
    });
  });

  describe('createRestaurant', () => {
    const restaurantName = 'Sushi Place';
    const responseRestaurant = {id: 1, name: restaurantName};

    it('returns the response to the right endpoint', async () => {
      nock('https://api.outsidein.dev')
        .post(/^\/\w+\/restaurants$/, {name: restaurantName})
        .reply(200, responseRestaurant, responseHeaders);

      await expect(api.createRestaurant(restaurantName)).resolves.toEqual(
        responseRestaurant,
      );
    });
  });
});
