import React from 'react';
import { useSelector } from 'react-redux';

import RestaurantCard from '../components/RestaurantCard';
import Spinner from '../components/Spinner';

import * as store from '../store';

type Props = {
  products: Product[];
};

const RestaurantsPage: React.FC<Props> = ({ products }) => {
  const loading = useSelector(store.getIsLoading);

  return (
    <>
      {loading
        ?
        <Spinner />
        :
        (
          products.length
            ?
            <ul className="restaurant__list">
              {products.map(({
                slug,
                uuid,
                title,
                heroImageUrl,
                categories,
                etaRange }) => (
                  <RestaurantCard
                    key={uuid}
                    slug={slug}
                    title={title}
                    imageUrl={heroImageUrl}
                    categories={categories}
                    etaRange={etaRange.text}
                  />
                ))}
            </ul>
            :
            <img
              className="restaurant__not-found"
              src={require('../styles/img/restaurant-not-found.jpg')}
              alt="restaurant not found"
            />
        )
      }
    </>
  );
}

export default RestaurantsPage;
