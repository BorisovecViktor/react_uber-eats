import React, { useEffect, useState, useMemo, useCallback } from "react";

import { fetchMenuDish } from "../helpers/api";
import * as store from '../store';

import LazyImageDish from './LazyImageDish';
import { useDispatch, useSelector } from "react-redux";
import { setPopupId } from "../store/popupCurrent";
import { openPopup } from "../store/popup";

interface Props {
  uuid: string;
  currency: string;
}

const MenuDish: React.FC<Props> = ({ uuid, currency }) => {
  const dispatch = useDispatch();
  const [dish, setDish] = useState<MenuDish>();
  const dishTitle = useMemo(() => (
    dish?.title
  ), [dish]);

  const maxTitleLength = 35;
  const shortTitle = (dishTitle && dishTitle.length > maxTitleLength)
    ?
    dishTitle.slice(0, maxTitleLength) + "..."
    :
    dishTitle;

  const getDish = useCallback(async () => {
    const menuDish = await fetchMenuDish(uuid);
    setDish(menuDish);
  }, [uuid]);

  useEffect(() => {
    getDish();
  }, [getDish]);

  const cart = useSelector(store.getCartData);
  const isAlreadyInCart = cart.some(item => dish?.uuid === item.id);

  const openPopupByClick = (id: string) => {
    dispatch(openPopup());
    dispatch(setPopupId(id));
  };

  return (
    <>
      {dishTitle && (
        <div
          className="menu__dish dish"
          onClick={() => openPopupByClick(dish?.uuid as string)}
        >
          <div className="dish__description">
            <h3 className="dish__title">{shortTitle}</h3>
            <p className="dish__price">{`${dish?.price}${currency}`}</p>
            {isAlreadyInCart && (
              <img
                src={require('../styles/img/check.svg')}
                alt="Check"
                className="dish__added-to-cart"
              />
            )}
          </div>
          <div className="dish__image-container">
            <LazyImageDish
              src={dish?.imageUrl || require('../styles/img/dish.png')}
              alt={dishTitle}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MenuDish;
