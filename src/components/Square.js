import React from 'react';

const Square = ({ value, isWinning, onClick }) => {
  return (
    <button
      className={`square ${value} ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
      disabled={value}
    >
      {value}
    </button>
  );
};

export default Square;
