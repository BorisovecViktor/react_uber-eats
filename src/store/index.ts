import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import * as api from '../helpers/api';
import productsReducer, { setProducts } from './products';
import errorReducer, { setError } from './error';
import loadingReducer, { startLoading, finishLoading } from './loading';

const rootReducer = combineReducers({
  products: productsReducer,
  errorMessage: errorReducer,
  isLoading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getProducts = (state: RootState) => state.products;
export const getErrorMessage = (state: RootState) => state.errorMessage;
export const getIsLoading = (state: RootState) => state.isLoading;

export const loadProducts = () => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(setError(''));
    dispatch(startLoading());

    try {
      const products = await api.fetchProducts();

      dispatch(setProducts(products));
    } catch (e) {
      dispatch(setError(e.message));
    } finally {
      dispatch(finishLoading());
    }
  }
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
