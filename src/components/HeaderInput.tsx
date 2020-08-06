import React, { useState, useRef } from 'react';
import cn from 'classnames';

import { useLocation, useHistory } from 'react-router-dom';

const HeaderInput: React.FC<HeaderInput> = ({
  query,
  iconUrl,
  value,
  onChange,
  type,
  placeholder,
  name,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handleInputFocus = () => {
    setIsFocused(true);
  }

  const handleInputBlur = () => {
    setIsFocused(false);
  }

  const focus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div
      className={cn(`header__control control control${className}`, {
        'control--focused': isFocused,
      })}
      onClick={focus}
    >
      {iconUrl &&
        <img
          src={iconUrl}
          alt={placeholder}
          className="control__icon"
        />
      }
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={e => onChange(e)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        name={name}
        placeholder={placeholder}
        className="control__input"
      />
      {query && query.length > 0 &&
        <button
          className="control__clear"
          type="button"
          onClick={() => {
            searchParams.delete('query');
            history.push({
              search: searchParams.toString(),
            });
          }}
        >
          {' '}
        </button>
      }
    </div>
  );
}

export default HeaderInput;
