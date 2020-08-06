import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as store from '../store';

import Spinner from '../components/Spinner';
import RestaurantDescription from '../components/RestaurantDescription';
import MenuSection from '../components/MenuSection';

const RestaurantDetailsPage = () => {
  const loading = useSelector(store.getIsLoading);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const products = useSelector(store.getProducts);
  const productsDetails = useSelector(store.getproductsDetails);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (product) {
      dispatch(store.loadProductsDetails(product.uuid));
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (products.length) {
      const currentProduct = products.find(product => (product.slug === slug));
      setProduct(currentProduct);
    }
  }, [products, slug]);

  const ratingBadge = useMemo(() => {
    if (productsDetails.ratingBadge) {
      return {
        __html: productsDetails.ratingBadge.text,
      };
    } else {
      return {
        __html: "",
      };
    }
  }, [productsDetails]);

  const imageNumber = useMemo(() => {
    return productsDetails && productsDetails.heroImageUrls
      ?
      productsDetails.heroImageUrls.length - 1
      : 0
  }, [productsDetails]);

  const menuList = useMemo(() => {
    if (productsDetails.sections) {
      return productsDetails.sections.map(uuid => productsDetails.sectionsMap[uuid]);
    } else {
      return [];
    }
  }, [productsDetails]);

  return (
    <>
      {loading
        ?
        <Spinner />
        :
        (productsDetails.heroImageUrls && product &&
          <div className="restaurant__details">
            <img
              className="restaurant__picture"
              src={productsDetails.heroImageUrls[imageNumber].url}
              alt={product.title}
            />
            <div className="restaurant__description description">
              <RestaurantDescription
                title={product.title}
                etaRange={product.etaRange.text}
                categories={product.categories}
              />
              <div
                className="restaurant__rating"
                dangerouslySetInnerHTML={ratingBadge}
              />
            </div>

            <div className="restaurant__menu menu">
              {menuList.length > 0 &&
                menuList.map(menuSection => (
                  <MenuSection
                    key={menuSection.uuid}
                    menuSection={menuSection}
                    currency={productsDetails.categories[0]}
                  />
                ))}
            </div>
          </div>
        )
      }
    </>
  )
}

export default RestaurantDetailsPage;
