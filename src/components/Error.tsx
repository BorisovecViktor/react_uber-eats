import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  error: string;
}

const Error: React.FC<Props> = ({ error }) => {
  return (
    <div className="error">
      <p className="error__text">
        {error}
      </p>
      <Link to="/" className="error__link">Go to home</Link>
    </div>
  );
}

export default Error;
