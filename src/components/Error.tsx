import React from 'react';

type Props = {
  error: string;
}

const Error: React.FC<Props> = ({ error }) => {
  return (
    <div className="error">
      <p className="error__text">
        {error}
      </p>
      <a href="/" className="error__link">Go to home</a>
    </div>
  );
}

export default Error;
