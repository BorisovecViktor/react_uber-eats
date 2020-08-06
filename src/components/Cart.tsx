import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCartItems } from "../helpers/api";

import * as store from '../store';

import { clearCart } from "../store/cart";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(store.getCartData);
  const [cartItems, setCartItems] = useState<MenuDish[]>([]);

  useEffect(() => {
    fetchCartItems(cart)
      .then(data => setCartItems(data))
  }, [cart]);

  const totalPrice = useMemo(() => (
    cartItems.reduce((reducer, currentItem) => {
      const сartItemsAmount = cart.find(item => item.id === currentItem.uuid)
        ?.count || 1;

      return reducer + (currentItem.price * сartItemsAmount);
    }, 0)
  ), [cartItems, cart]);

  const handleClearCart = () => {
    dispatch(clearCart());
    window.scrollTo(0, 0);
  };

  return (
    <>
      {cart.length === 0 && (
        <div className="cart__empty">
          <p className="cart__empty-text">Cart is empty</p>
          <Link to="/" className="cart__empty-link">
            Go to shop
          </Link>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart">
          <ul className="cart__list">
            {cartItems.length > 0 &&
              cartItems.map(item => (
                <li className="cart__item cart-item" key={item.uuid}>
                  <CartItem item={item} />
                </li>
              ))}
          </ul>
          <div className="cart__total">
            <p className="cart__total-price">Total price: {totalPrice}₴</p>
            <Link to="/order" className="cart__order">
              <button
                type="button"
                className="cart__total-buy"
                onClick={handleClearCart}
              >
                Buy now
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
