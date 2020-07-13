import React from 'react';
import LazyImage from './LazyImage';

type Props = {
  title: string,
  imageUrl: string,
  categories: string[],
  etaRange: string,
}

const RestaurantCard: React.FC<Props> = ({
  title,
  imageUrl,
  categories,
  etaRange }) => {
  return (
    <>
      <LazyImage src={imageUrl} alt={title} />
      <h2 className="card__title">{title}</h2>
      <div className="card__categories">
        {categories.join(' • ')}
      </div>
      <div className="card__eta">
        {etaRange}
      </div>
    </>
  );
}

export default RestaurantCard;
