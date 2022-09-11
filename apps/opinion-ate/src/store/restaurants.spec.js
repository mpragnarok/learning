import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import restaurantsReducer from './restaurants/reducers';
import {loadRestaurants} from './restaurants/actions';

describe('restaurants', () => {
  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  describe('initially', () => {
    let store;

    beforeEach(() => {
      const initialState = {};
      store = configureStore({
        reducer: restaurantsReducer,
        middleware: [thunk],
        preloadedState: initialState,
      });
    });

    it('does not have the loading flag set', () => {
      expect(store.getState().loading).toEqual(false);
    });
    it('does not have the error flat set', () => {
      expect(store.getState().loadError).toEqual(false);
    });
  });
  describe('when loading succeeds', () => {
    let store;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };
      const initialState = {records: []};
      // create store by ourself
      store = configureStore({
        reducer: restaurantsReducer,
        // argument that pass into .withExtraArgument() will be available to all thunk funcitons
        middleware: [thunk.withExtraArgument(api)],
        preloadedState: initialState,
      });
      return store.dispatch(loadRestaurants());
    });

    it('stores the restaurants', () => {
      expect(store.getState().records).toEqual(records);
    });

    it('clears the loading state', () => {
      expect(store.getState().loading).toEqual(false);
    });
  });
  describe('while loading', () => {
    let store;
    beforeEach(() => {
      const api = {loadRestaurants: () => new Promise(() => {})};
      const initialState = {loadError: true};
      store = configureStore({
        reducer: restaurantsReducer,
        middleware: [thunk.withExtraArgument(api)],
        preloadedState: initialState,
      });
      store.dispatch(loadRestaurants());
    });
    it('sets a loading flag', () => {
      expect(store.getState().loading).toEqual(true);
    });
    it('clears the error flag', () => {
      expect(store.getState().loadError).toEqual(false);
    });
  });
  describe('when loading fails', () => {
    let store;
    beforeEach(() => {
      const api = {loadRestaurants: () => Promise.reject()};
      const initialState = {};
      store = configureStore({
        reducer: restaurantsReducer,
        middleware: [thunk.withExtraArgument(api)],
        preloadedState: initialState,
      });
      return store.dispatch(loadRestaurants());
    });
    it('set an error flag', () => {
      expect(store.getState().loadError).toEqual(true);
    });
    it('clears the loading flag', () => {
      expect(store.getState().loading).toEqual(false);
    });
  });
});
