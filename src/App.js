import React, { useState, useEffect } from 'react';
import './App.css';
import PageContent from './components/PageContent';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [lastScored, setLastScored] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [gameMode, setGameMode] = useState('pvp');
  const [difficulty, setDifficulty] = useState('medium');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
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
    if (result) return result.winner === 'O' ? 10 - depth : depth - 10;
    if (!getAvailableMoves(squares).length) return 0;
    if (depth >= 6) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let move of getAvailableMoves(squares)) {
        const newSquares = [...squares];
        newSquares[move] = 'O';
        const evaluation = minimax(newSquares, depth + 1, false, alpha, beta);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let move of getAvailableMoves(squares)) {
        const newSquares = [...squares];
        newSquares[move] = 'X';
        const evaluation = minimax(newSquares, depth + 1, true, alpha, beta);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  };

  const getBestMove = (squares) => {
    const availableMoves = getAvailableMoves(squares);
    if (!availableMoves.length) return null;

    if (difficulty === 'easy') {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    if (difficulty === 'medium' && Math.random() < 0.3) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    let bestMove = null;
    let bestEval = -Infinity;

    for (let move of availableMoves) {
      const newSquares = [...squares];
      newSquares[move] = 'O';
      const evaluation = minimax(newSquares, 0, false);
      if (evaluation > bestEval) {
        bestEval = evaluation;
        bestMove = move;
      }
    }

    return bestMove;
  };

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinningLine(result.line);
      setScores(prev => {
        const newScores = { ...prev, [result.winner]: prev[result.winner] + 1 };
        setLastScored(result.winner);
        return newScores;
      });
      return;
    }

    if (!newBoard.includes(null)) return;

    setIsXNext(!isXNext);

    if (gameMode === 'cpu' && isXNext) {
      setTimeout(() => {
        const cpuMove = getBestMove(newBoard);
        if (cpuMove !== null) {
          const nextBoard = [...newBoard];
          nextBoard[cpuMove] = 'O';
          setBoard(nextBoard);

          const cpuResult = calculateWinner(nextBoard);
          if (cpuResult) {
            setWinningLine(cpuResult.line);
            setScores(prev => {
              const newScores = { ...prev, [cpuResult.winner]: prev[cpuResult.winner] + 1 };
              setLastScored(cpuResult.winner);
              return newScores;
            });
            return;
          }

          setIsXNext(true);
        }
      }, 500);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine([]);
  };

  const handleResetScores = () => {
    setScores({ X: 0, O: 0 });
    setLastScored(null);
  };

  const handleModeChange = (mode) => {
    setGameMode(mode);
    handleReset();
    setIsXNext(true);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    handleReset();
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="app">
      <Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
      
      <PageContent
        gameMode={gameMode}
        difficulty={difficulty}
        onModeChange={handleModeChange}
        onDifficultyChange={handleDifficultyChange}
        board={board}
        winningLine={winningLine}
        onSquareClick={handleClick}
        scores={scores}
        lastScored={lastScored}
        onReset={handleReset}
        onResetScores={handleResetScores}
      />

      <Footer />
    </div>
  );
}

export default App;
