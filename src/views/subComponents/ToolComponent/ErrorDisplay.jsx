import React from 'react';
import { FaExclamationCircle } from "react-icons/fa";

const ErrorDisplay = ({ error }) => {
  if (!error) return null;
  
  return (
    <p className="error-message">
      <FaExclamationCircle /> {error}
    </p>
  );
};

export default ErrorDisplay;