import React from "react";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <div className="order">
      <p className="order__text">Thank you for order</p>
      <Link to="/" className="order__link">
        Back to home page
      </Link>
    </div>
  );
};

export default Order;
