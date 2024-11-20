import React from 'react';

const GameModes = ({ gameMode, difficulty, onModeChange, onDifficultyChange }) => {
  return (
    <>
      <div className="game-modes">
        <button 
          className={`mode-button ${gameMode === 'pvp' ? 'active' : ''}`}
          onClick={() => onModeChange('pvp')}
        >
          👥 Jogador vs Jogador
        </button>
        <button 
          className={`mode-button ${gameMode === 'cpu' ? 'active' : ''}`}
          onClick={() => onModeChange('cpu')}
        >
          🤖 Jogador vs Computador
        </button>
      </div>

      {gameMode === 'cpu' && (
        <div className="difficulty-select">
          <select 
            value={difficulty} 
            onChange={(e) => onDifficultyChange(e.target.value)}
          >
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>
        </div>
      )}
    </>
  );
};

export default GameModes;
