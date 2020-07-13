import React, { useState } from 'react';

import HeaderInput from './HeaderInput';

const Header = () => {
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('12:00');
  const [search, setSearch] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch(e.target.name) {
      case 'address': setAddress(e.target.value);
      break;
      case 'time': setTime(e.target.value);
      break;
      case 'search': setSearch(e.target.value);
      break;
      default: return;
    }
  }

  return (
    <header className="header">
      <div className="content">
        <div className="header__container">
          <img
            className="header__logo"
            src={require('../styles/img/logo.svg')}
            alt="Uber Eats"
          />
          <div className="header__delivery-info">
            <HeaderInput
              type="text"
              name="address"
              value={address}
              onChange={handleInputChange}
              placeholder="20 Fenchurch St."
              iconUrl={require('../styles/img/place.svg')}
              className="--address"
            />
            <HeaderInput
              type="time"
              name="time"
              value={time}
              onChange={handleInputChange}
              placeholder="Time"
              className="--time"
            />
          </div>
          <HeaderInput
            type="text"
            name="search"
            value={search}
            onChange={handleInputChange}
            placeholder="Search"
            iconUrl={require('../styles/img/search.svg')}
            className="--search"
          />
          <a className="header__link" href="/sign-in">
            Sign In
        </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
