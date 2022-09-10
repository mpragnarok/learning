import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import restaurantsReducer from './restaurants/reducers';
import {loadRestaurants} from './restaurants/actions';

describe('restaurants', () => {
  describe('loadRestaurants action', () => {
    it('stores the restaurants', async () => {
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };
      const initialState = {records: []};
      // create store by ourself
      const store = configureStore({
        reducer: restaurantsReducer,
        // argument that pass into .withExtraArgument() will be available to all thunk funcitons
        middleware: [thunk.withExtraArgument(api)],
        preloadedState: initialState,
      });
      console.log('store', store);
      await store.dispatch(loadRestaurants());
      expect(store.getState().records).toEqual(records);
    });
  });
});
