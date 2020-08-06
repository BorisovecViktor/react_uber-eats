import { Action } from 'redux';

const SET_PRODUCTS_DETAILS = 'SET_PRODUCTS_DETAILS';

type SetProductsDetailsAction = Action<typeof SET_PRODUCTS_DETAILS> & {
  productsDetails: ProductDetails;
};

export const setProductsDetails = (productsDetails: ProductDetails) => ({
  type: SET_PRODUCTS_DETAILS,
  productsDetails,
});

type PossibleActions = SetProductsDetailsAction;

const reducer = (productsDetails: ProductDetails = {} as ProductDetails, action: PossibleActions) => {
  switch (action.type) {
    case SET_PRODUCTS_DETAILS:
      return action.productsDetails;

    default:
      return productsDetails;
  }
};

export default reducer;
