import React from 'react';

type Props = {
  uuid: string,
  title: string,
  imageUrl: string,
  categories: string[],
  etaRange: string,
}

const RestaurantCard: React.FC<Props> = ({
  // uuid,
  title,
  imageUrl,
  categories,
  etaRange }) => {
  return (
    <>
      <img src={imageUrl} alt={title} className="card__img" />
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
