import React, { useState } from 'react';
import cn from 'classnames';

import { SELECT_ITEMS } from '../constants';

const FooterSelect = () => {
  const [current, setCurrent] = useState(SELECT_ITEMS[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeItems = (current: string) => {
    setCurrent(current);
    setIsOpen(false);
  };

  return (
    <div className="footer__select select">
      <div
        className="select__container"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={require('../styles/img/world.svg')}
          alt="select icon"
          className="select__icon"
        />
        <div className="select__current">{current}</div>
        <img
          src={require('../styles/img/arrow-down.svg')}
          alt="arrow down"
          className={cn('select__arrow', {
            "select__arrow--up": isOpen,
          })}
        />
      </div>
      <ul className={cn('select__list', {
        'select__open': isOpen
      })}>
        {SELECT_ITEMS.filter(item => item !== current)
          .map(item => (
            <li
              className="select__item"
              onClick={() => handleChangeItems(item)}
              key={item}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FooterSelect;
