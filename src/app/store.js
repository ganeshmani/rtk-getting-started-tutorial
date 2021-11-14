import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { productsApi } from './services/product';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath] : productsApi.reducer
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
});

setupListeners(store.dispatch)