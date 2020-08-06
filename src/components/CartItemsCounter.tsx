import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as store from '../store';

import { changeItemCount } from "../store/cart";

interface Props {
  id: string;
}

const CartItemsCounter: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const cart = useSelector(store.getCartData);
  const maxAmount = 10;
  const minAmount = 1;
  const [currentAmount, setCurrentAmount] = useState(1);

  useEffect(() => {
    const amount = cart.find(item => item.id === id)?.count;
    amount && setCurrentAmount(amount);
  }, [cart, id]);

  return (
    <div className="cart__counter counter">
      <button
        disabled={currentAmount === minAmount}
        className="counter__button counter__button--minus"
        onClick={() => dispatch(changeItemCount(id, -1))}
      >
      </button>
      <p className="counter__amount">{currentAmount}</p>
      <button
        disabled={currentAmount === maxAmount}
        className="counter__button counter__button--plus"
        onClick={() => dispatch(changeItemCount(id, 1))}
      >
      </button>
    </div>
  );
};

export default CartItemsCounter;
