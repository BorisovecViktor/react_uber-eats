import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  const handleClickToDetails = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to="/"
      className="header__logo"
      onClick={handleClickToDetails}
    >
      <img
        className="header__logo-img"
        src={require('../styles/img/logo.svg')}
        alt="Uber Eats"
      />
    </Link>
  );
}

export default Logo;
