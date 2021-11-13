import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import counterReducer from '../features/counter/counterSlice';
import { productsApi } from './services/product';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productsApi.reducerPath] : productsApi.reducer
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
});

setupListeners(store.dispatch)