import { Action } from "redux";

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const CHANGE_ITEM_COUNT = 'CHANGE_ITEM_COUNT';
const CLEAR_CART = 'CLEAR_CART';

type AddToCartAction = Action<typeof ADD_TO_CART> & {
  id: string;
};

type DeleteFromCartAction = Action<typeof DELETE_FROM_CART> & {
  id: string;
};

type ChangeItemCountAction = Action<typeof CHANGE_ITEM_COUNT> & {
  path: number;
  id: string;
};

type ClearCartAction = Action<typeof CLEAR_CART>;

export const addToCart = (id: string) => ({
  type: ADD_TO_CART,
  id,
});

export const deleteFromCart = (id: string) => ({
  type: DELETE_FROM_CART,
  id,
});

export const changeItemCount = (id: string, path: number) => ({
  type: CHANGE_ITEM_COUNT,
  id,
  path,
});

export const clearCart = () => ({ type: CLEAR_CART })

type PossibleActions = AddToCartAction
  | DeleteFromCartAction
  | ChangeItemCountAction
  | ClearCartAction;

let initState: Cart[] = [];

if (localStorage.getItem("cartItem")) {
  initState = [...JSON.parse(localStorage.getItem("cartItem") || "")];
}

const reducer = (cart = initState, action: PossibleActions) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (action.id) {
        return [
          ...cart,
          {
            id: action.id,
            count: 1,
          },
        ];
      } else {
        return cart;
      }
    }

    case DELETE_FROM_CART:
      return cart.filter(item => item.id !== action.id);

    case CHANGE_ITEM_COUNT:
      return cart.map(item => ({
        ...item,
        count: item.id === action.id ? item.count + action.path : item.count,
      }));

    case CLEAR_CART:
      return [];

    default:
      return cart;
  }
};

export default reducer;
