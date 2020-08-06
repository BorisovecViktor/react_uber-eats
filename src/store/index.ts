import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import * as api from '../helpers/api';
import productsReducer, { setProducts } from './products';
import productsDetailsReducer, { setProductsDetails } from './productsDetails';
import errorReducer, { setError } from './error';
import loadingReducer, { startLoading, finishLoading } from './loading';
import searchReducer from './search';
import popupStatusReducer from "./popup";
import popupCurrentId from './popupCurrent';
import cartReducer from './cart';

const rootReducer = combineReducers({
  products: productsReducer,
  productsDetails: productsDetailsReducer,
  errorMessage: errorReducer,
  isLoading: loadingReducer,
  searchQuery: searchReducer,
  popupStatus: popupStatusReducer,
  popupId: popupCurrentId,
  cartData: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getProducts = (state: RootState) => state.products;
export const getproductsDetails = (state: RootState) => state.productsDetails;
export const getErrorMessage = (state: RootState) => state.errorMessage;
export const getIsLoading = (state: RootState) => state.isLoading;
export const getPopupStatus = (state: RootState) => state.popupStatus;
export const getPopupId = (state: RootState) => state.popupId;
export const getCartData = (state: RootState) => state.cartData;

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

export const loadProductsDetails = (productId: string) => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(setError(''));
    dispatch(startLoading());

    try {
      const productsDetails = await api.fetchProductsDetails(productId);

      dispatch(setProductsDetails(productsDetails));
      dispatch(finishLoading());
    } catch (e) {
      dispatch(setError(e.message));
      dispatch(finishLoading());
    }
  };
};

export const getVisibleProducts = (state: RootState) => {
  let visibleProducts: Product[] = state.products.filter((item: Product) => {
    if (state.searchQuery !== '') {
      return (`${item.title.toLowerCase()} 
      ${item.categories.join('•').toLowerCase()}`).includes(state.searchQuery);
    }

    return item;
  });

  return visibleProducts;
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
