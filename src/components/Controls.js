import React from 'react';

const Controls = ({ onReset, onResetScores }) => {
  return (
    <div className="controls">
      <button onClick={onReset}>Reiniciar</button>
      <button onClick={onResetScores}>Zerar Placar</button>
    </div>
  );
};

export default Controls;
