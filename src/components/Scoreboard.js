import React from 'react';

const Scoreboard = ({ scores, lastScored, gameMode }) => {
  return (
    <div className="scoreboard">
      <h2>Placar</h2>
      <div className="scores">
        <div className="score-item">
          <span className="player">
            {gameMode === 'pvp' ? 'Jogador X' : 'Jogador'}
          </span>
          <span className={`score ${lastScored === 'X' ? 'score-changed' : ''}`}>
            {scores.X}
          </span>
        </div>
        <div className="score-item">
          <span className="player">
            {gameMode === 'pvp' ? 'Jogador O' : 'Computador'}
          </span>
          <span className={`score ${lastScored === 'O' ? 'score-changed' : ''}`}>
            {scores.O}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
