import React from 'react';
import { useHistory } from 'react-router-dom';

import LazyImageRestaurant from './LazyImageRestaurant';
import { startLoading } from '../store/loading';
import { useDispatch } from 'react-redux';

type Props = {
  slug: string,
  title: string,
  imageUrl: string,
  categories: string[],
  etaRange: string,
}

const RestaurantCard: React.FC<Props> = ({
  slug,
  title,
  imageUrl,
  categories,
  etaRange }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickToDetails = () => {
    history.push(`/restaurants/${slug}`);
    dispatch(startLoading());
    window.scrollTo(0, 0);
  };

  return (
    <li
      className="restaurant__card card"
      onClick={handleClickToDetails}
    >
      <div className="card__image-container">
        <LazyImageRestaurant src={imageUrl} alt={title} />
      </div>
      <h2 className="card__title">{title}</h2>
      <div className="card__categories">
        {categories.join(' • ')}
      </div>
      <div className="card__eta">
        {etaRange}
      </div>
    </li>
  );
}

export default RestaurantCard;
