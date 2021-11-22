import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import productsReducer from '../features/product/productSlice';
import { createLogger } from 'redux-logger'
const isProduction = process.env.NODE_ENV === 'production';

const rootReducer = combineReducers({
  products: productsReducer.reducer,
})

const logger = createLogger({
  collapsed: true,
})

const middleware = isProduction ? [] : [logger]

export const store = configureStore({
  reducer: rootReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  devTools : !isProduction
});

setupListeners(store.dispatch)