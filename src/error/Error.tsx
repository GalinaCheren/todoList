import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

export const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="error">
        <h1>404</h1>
        <h5> This page is not found :( </h5>
      </div>
      <div className="error-button">
        <button
          className="err-btn"
          onClick={() => {
            navigate('/watch');
          }}
        ></button>
      </div>
    </>
  );
};
