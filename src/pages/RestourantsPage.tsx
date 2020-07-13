import React from 'react';

import RestaurantCard from '../components/RestaurantCard';
import Spinner from '../components/Spinner';
import Error from '../components/Error';

import { useSelector } from 'react-redux';
import * as store from '../store';

type Props = {
  products: Product[];
};

const RestaurantsPage: React.FC<Props> = ({ products }) => {
  const loading = useSelector(store.getIsLoading);
  const error = useSelector(store.getErrorMessage);

  return (
    <>
      {error && <Error error={error} />}
      {loading
        ?
        <Spinner />
        :
        <ul className="restaurant__list">
          {products.map(({
            uuid,
            title,
            heroImageUrl,
            categories,
            etaRange }) => (
              <li key={uuid} className="restaurant__card card">
                <RestaurantCard
                  uuid={uuid}
                  title={title}
                  imageUrl={heroImageUrl}
                  categories={categories}
                  etaRange={etaRange.text}
                />
              </li>
            ))}
        </ul>
      }
    </>
  );
}

export default RestaurantsPage;
