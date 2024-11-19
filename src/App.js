import React, { useState } from 'react';
import './App.css';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6] // Diagonal
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp' or 'cpu'
  const [difficulty, setDifficulty] = useState('easy'); // 'easy', 'medium', 'hard'
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningLine, setWinningLine] = useState([]);

  const calculateWinner = (squares) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          line: [a, b, c]
        };
      }
    }
    return null;
  };

  const getAvailableMoves = (squares) => {
    return squares.reduce((moves, square, index) => {
      if (!square) moves.push(index);
      return moves;
    }, []);
  };

  const minimax = (squares, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
    const result = calculateWinner(squares);
    if (result) return result.winner === 'X' ? -10 + depth : 10 - depth;
    if (!getAvailableMoves(squares).length) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let move of getAvailableMoves(squares)) {
        squares[move] = 'O';
        const evaluation = minimax(squares, depth + 1, false, alpha, beta);
        squares[move] = null;
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let move of getAvailableMoves(squares)) {
        squares[move] = 'X';
        const evaluation = minimax(squares, depth + 1, true, alpha, beta);
        squares[move] = null;
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  };

  const getCPUMove = (squares) => {
    const availableMoves = getAvailableMoves(squares);
    
    if (difficulty === 'easy') {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    if (difficulty === 'medium' && Math.random() < 0.3) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    let bestMove;
    let bestScore = -Infinity;

    for (let move of availableMoves) {
      squares[move] = 'O';
      const score = minimax(squares, 0, false);
      squares[move] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinningLine(result.line);
      setScores(prev => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1
      }));
    } else {
      setWinningLine([]);
    }

    setIsXNext(!isXNext);

    // CPU's turn
    if (!result && gameMode === 'cpu' && isXNext) {
      setTimeout(() => {
        const cpuMove = getCPUMove([...newBoard]);
        const nextBoard = [...newBoard];
        nextBoard[cpuMove] = 'O';
        setBoard(nextBoard);
        
        const cpuResult = calculateWinner(nextBoard);
        if (cpuResult) {
          setWinningLine(cpuResult.line);
          setScores(prev => ({
            ...prev,
            [cpuResult.winner]: prev[cpuResult.winner] + 1
          }));
        } else {
          setWinningLine([]);
        }
        
        setIsXNext(true);
      }, 500);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine([]);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
  };

  const result = calculateWinner(board);
  const winner = result ? result.winner : null;
  const isDraw = !winner && board.every(cell => cell !== null);
  const status = winner 
    ? `Vencedor: ${winner}` 
    : isDraw 
    ? 'Empate!' 
    : `Próximo jogador: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1>Jogo da Velha</h1>
      
      <div className="game-modes">
        <select 
          value={gameMode} 
          onChange={(e) => {
            setGameMode(e.target.value);
            resetGame();
          }}
        >
          <option value="pvp">Jogador vs Jogador</option>
          <option value="cpu">Jogador vs Computador</option>
        </select>

        {gameMode === 'cpu' && (
          <select 
            value={difficulty} 
            onChange={(e) => {
              setDifficulty(e.target.value);
              resetGame();
            }}
          >
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>
        )}
      </div>

      <div className="status">{status}</div>
      
      <div className="scores">
        <div>X: {scores.X}</div>
        <div>O: {scores.O}</div>
      </div>

      <div className="board">
        {board.map((square, index) => (
          <button 
            key={index} 
            className={`square ${square} ${winningLine.includes(index) ? 'winning' : ''}`} 
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>

      <div className="controls">
        <button onClick={resetGame}>Reiniciar Jogo</button>
        <button onClick={resetScores}>Zerar Placar</button>
      </div>
    </div>
  );
}

export default App;
