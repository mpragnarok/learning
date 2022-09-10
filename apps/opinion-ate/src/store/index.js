import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import api from '../api';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument(api)],
});
export default store;
