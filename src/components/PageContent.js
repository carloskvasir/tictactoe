import React from 'react';
import Board from './Board';
import Scoreboard from './Scoreboard';
import GameModes from './GameModes';
import Controls from './Controls';

const PageContent = ({
  gameMode,
  difficulty,
  onModeChange,
  onDifficultyChange,
  board,
  winningLine,
  onSquareClick,
  scores,
  lastScored,
  onReset,
  onResetScores
}) => {
  return (
    <main className="page-content">
      <section className="game-settings">
        <GameModes
          gameMode={gameMode}
          difficulty={difficulty}
          onModeChange={onModeChange}
          onDifficultyChange={onDifficultyChange}
        />
      </section>

      <section className="game-board">
        <Board
          board={board}
          winningLine={winningLine}
          onSquareClick={onSquareClick}
        />
      </section>

      <section className="game-stats">
        <Scoreboard
          scores={scores}
          lastScored={lastScored}
          gameMode={gameMode}
        />
      </section>

      <section className="game-actions">
        <Controls
          onReset={onReset}
          onResetScores={onResetScores}
        />
      </section>
    </main>
  );
};

export default PageContent;
