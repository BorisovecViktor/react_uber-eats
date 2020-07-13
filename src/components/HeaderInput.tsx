import React, { useState, useRef } from 'react';
import cn from 'classnames';

const Input: React.FC<HeaderInput> = ({
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

  const handkeInputFocus = () => {
    setIsFocused(true);
  }

  const handkeInputBlur = () => {
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
        onFocus={handkeInputFocus}
        onBlur={handkeInputBlur}
        name={name}
        placeholder={placeholder}
        className="control__input"
      />
    </div>
  );
}

export default Input;
