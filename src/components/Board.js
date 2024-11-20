import React from 'react';
import Square from './Square';

const Board = ({ board, winningLine, onSquareClick }) => {
  return (
    <div className="board">
      {[0, 1, 2].map(row => (
        <div key={row} className="board-row">
          {[0, 1, 2].map(col => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={board[index]}
                isWinning={winningLine.includes(index)}
                onClick={() => onSquareClick(index)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
