import React from "react";
import { useDispatch } from "react-redux";

import { deleteFromCart } from "../store/cart";
import CartItemsCounter from "./CartItemsCounter";

interface Props {
  item: MenuDish;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(deleteFromCart(item.uuid));
  };
  
  return (
    <>
      <div className="cart-item__trash-container">
        <img
          className="cart-item__trash-img"
          src={require('../styles/img/trash.svg')}
          alt="trash"
          onClick={removeFromCart}
        />
      </div>
      <div className="cart-item__info">
        <h2 className="cart-item__title">{item.title}</h2>
        <CartItemsCounter id={item.uuid} />
        <p className="cart-item__price">price: {item.price}₴</p>
      </div>
      <img
        className="cart-item__image"
        src={item.imageUrl || require('../styles/img/dish.png')}
        alt="dish"
      />
    </>
  );
};

export default CartItem;
