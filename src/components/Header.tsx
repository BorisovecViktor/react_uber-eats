import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { debounce } from '../helpers/debounce';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/search';
import cn from 'classnames';

import * as store from '../store';

import HeaderInput from './HeaderInput';
import Logo from './Logo';

const Header = () => {
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('12:00');

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = useMemo(() => searchParams.get('query') || '', [searchParams]);
  const [visibleQuery, setVisibleQuery] = useState(query);
  const cartLength = useSelector(store.getCartData).length;
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isMobileAddressVisible, setIsMobileAddressVisible] = useState(false);
  const [isMobileTimeVisible, setIsMobileTimeVisible] = useState(false);

  useEffect(() => {
    dispatch(setSearchQuery(query));
    setVisibleQuery(query);
  }, [query, dispatch]);

  const handleSearchInput = useCallback(debounce((value: string) => {
    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    dispatch(setSearchQuery(value));
    history.push({
      search: searchParams.toString(),
    });
  }, 500), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'address') {
      setAddress(e.target.value);
    }

    if (e.target.name === 'time') {
      setTime(e.target.value);
    }

    if (e.target.name === 'search') {
      handleSearchInput(e.currentTarget.value);
      setVisibleQuery(e.currentTarget.value);
    }
  }

  const currentLocation = useMemo(() => (
    location.pathname
      .split('/')
      .slice(1)[0]
  ), [location]);

  useEffect(() => {
    if (currentLocation !== '') {
      setIsMobileAddressVisible(false);
      setIsMobileTimeVisible(false);
      setIsMobileSearchVisible(false);
    }
  }, [currentLocation]);

  const toggleMobileControls = (type: string) => {
    if (type === 'search') {
      setIsMobileSearchVisible(!isMobileSearchVisible);
      setIsMobileAddressVisible(false);
      setIsMobileTimeVisible(false);
    }

    if (type === 'address') {
      setIsMobileAddressVisible(!isMobileAddressVisible);
      setIsMobileSearchVisible(false);
      setIsMobileTimeVisible(false);
    }

    if (type === 'time') {
      setIsMobileTimeVisible(!isMobileTimeVisible);
      setIsMobileAddressVisible(false);
      setIsMobileSearchVisible(false);
    }

    if (type === 'closeAll') {
      setIsMobileTimeVisible(false);
      setIsMobileAddressVisible(false);
      setIsMobileSearchVisible(false);
    }
  }

  return (
    <header className="header">
      <div className="content">
        <div className="header__container">
          <Logo />
          {!currentLocation &&
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
          }
          <div className="header__flex-wrap">
            {!currentLocation &&
              <>
                <div className="header__toggle-buttons">
                  <>
                    <button
                      className="header__toggle-button"
                      type="button"
                      onClick={() => toggleMobileControls('address')}
                    >
                      <img
                        className="header__toggle-icon"
                        src={require('../styles/img/place.svg')}
                        alt="address icon"
                      />
                    </button>
                    <button
                      className="header__toggle-button"
                      type="button"
                      onClick={() => toggleMobileControls('time')}
                    >
                      <img
                        className="header__toggle-icon"
                        src={require('../styles/img/time.svg')}
                        alt="time icon"
                      />
                    </button>
                    <button
                      className="header__toggle-button"
                      type="button"
                      onClick={() => toggleMobileControls('search')}
                    >
                      <img
                        className="header__toggle-icon"
                        src={require('../styles/img/search.svg')}
                        alt="search icon"
                      />
                    </button >
                  </>
                </div>
                <div className="header__search-container">
                  <HeaderInput
                    query={query}
                    type="text"
                    name="search"
                    value={visibleQuery}
                    onChange={handleInputChange}
                    placeholder="Search restourant"
                    iconUrl={require('../styles/img/search.svg')}
                    className="--search"
                  />
                </div>
              </>
            }
            <Link
              to="/cart"
              className={cn('header__cart', {
                'header__cart--right': currentLocation
              })}
              onClick={() => window.scrollTo(0, 0)}
            >
              {cartLength > 0 && (
                <span className="header__cart-icon">{cartLength}</span>
              )}
              <img
                className="header__cart-image"
                src={require('../styles/img/cart.svg')}
                alt="cart"
              />
            </Link>
            <Link
              to="/sign-in"
              className="header__link"
            >
              Sign In
            </Link>
          </div>
        </div>
        <>
          {(isMobileSearchVisible || isMobileAddressVisible || isMobileTimeVisible)
            &&
            <div className="header__mobile-controls">
              {isMobileSearchVisible && (
                <HeaderInput
                  query={query}
                  type="text"
                  name="search"
                  value={visibleQuery}
                  onChange={handleInputChange}
                  placeholder="Search restourant"
                  iconUrl={require('../styles/img/search.svg')}
                  className="--search"
                />
              )}
              {isMobileAddressVisible && (
                <HeaderInput
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                  placeholder="20 Fenchurch St."
                  iconUrl={require('../styles/img/place.svg')}
                  className="--address"
                />
              )}
              {isMobileTimeVisible && (
                <HeaderInput
                  type="time"
                  name="time"
                  value={time}
                  onChange={handleInputChange}
                  placeholder="Time"
                  className="--time"
                />
              )}
              <button
                className="header__mobile-controls-close"
                type="button"
                onClick={() => toggleMobileControls('closeAll')}
              ></button>
            </div>
          }
        </>
      </div>
    </header >
  );
}

export default Header;
