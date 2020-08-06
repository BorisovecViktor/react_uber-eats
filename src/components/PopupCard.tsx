import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuDish } from "../helpers/api";
import cn from "classnames";

import * as store from '../store';

import { closePopup } from "../store/popup";
import { deletePopupId } from "../store/popupCurrent";
import { addToCart, deleteFromCart } from "../store/cart";

const PopupCard = () => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(store.getPopupStatus);
  const popupId = useSelector(store.getPopupId);
  const cart = useSelector(store.getCartData);

  const [currentPopupInfo, setCurrentPopupInfo] = useState<MenuDish>();
  const [altUrl, setAltUrl] = useState("");

  const maxLengthOfDescription = 240;
  const isAlreadyInCart = cart.some(item => currentPopupInfo?.uuid === item.id);

  const getItemFromServer = useCallback(async () => {
    const getItem = await fetchMenuDish(popupId as string);
    setCurrentPopupInfo(getItem);
  }, [popupId]);

  useEffect(() => {
    getItemFromServer();
  }, [popupId, getItemFromServer]);

  const description =
    currentPopupInfo?.itemDescription &&
      currentPopupInfo?.itemDescription.length > maxLengthOfDescription
      ? currentPopupInfo?.itemDescription.slice(0, maxLengthOfDescription) +
      "..."
      : currentPopupInfo?.itemDescription;

  const handleClosePopupWindow = () => {
    dispatch(closePopup());
    dispatch(deletePopupId());
  };

  const addGoodToCart = () => {
    dispatch(addToCart(currentPopupInfo?.uuid as string));
  };

  const removeItemFromCart = () => {
    dispatch(deleteFromCart(currentPopupInfo?.uuid as string));
  };

  const checkError = () => {
    if (currentPopupInfo && !currentPopupInfo?.imageUrl) {
      setAltUrl(require('../styles/img/dish.png'));
    }
  };

  return (
    <>
      {currentPopupInfo && (
        <div
          className={cn("popup", {
            "popup--open": popupStatus
          })}
        >
          <button className="popup__close"
            onClick={handleClosePopupWindow}
          ></button>
          <div className="popup__container">
            <img
              src={currentPopupInfo?.imageUrl || altUrl}
              alt="Dish"
              className="popup__img"
              onError={checkError}
            />
            <div className="popup__description">
              <p className="popup__title">
                {currentPopupInfo?.title || "Dish"}
              </p>
              <p className="popup__text">{description}</p>
            </div>
          </div>
          {isAlreadyInCart && (
            <button
              type="button"
              className="popup__remove-button"
              onClick={removeItemFromCart}
            >
              Remove from cart
            </button>
          )}
          {!isAlreadyInCart && (
            <button
              type="button"
              className="popup__add-button"
              onClick={addGoodToCart}
            >
              Add to cart
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default PopupCard;
