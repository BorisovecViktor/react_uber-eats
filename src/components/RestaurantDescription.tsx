import React from "react";

interface Props {
  title: string;
  etaRange: string;
  categories: string[];
}

const RestaurantDescription: React.FC<Props> = ({ title, etaRange, categories }) => {
  return (
    <div className="description__container">
      <p className="description__title">{title}</p>
      <p className="description__categories">
        {categories.join(" • ")}
      </p>
      <p className="description__eta">{etaRange}</p>
    </div>
  );
};

export default RestaurantDescription;
