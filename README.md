# React Tic-Tac-Toe Game

A modern implementation of the classic Tic-Tac-Toe game built with React. This project features multiple game modes, difficulty levels, and a scoring system.

## Features

- 🎮 Two Game Modes:
  - Player vs Player (PvP)
  - Player vs Computer (PvC)
- 🤖 Three AI Difficulty Levels:
  - Easy: Random moves
  - Medium: Mix of random and strategic moves
  - Hard: Unbeatable AI using the Minimax algorithm
- 📊 Score Tracking System
- 🎯 Visual feedback for winning combinations
- 🎨 Modern and responsive design
- ⚡ Fast and efficient performance

## Technologies Used

- React 18
- CSS3 with Flexbox and Grid
- JavaScript ES6+

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tictactoe.git
```

2. Navigate to the project directory:
```bash
cd tictactoe
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to play the game in your browser.

## How to Play

1. Choose your game mode (PvP or vs Computer)
2. If playing against the computer, select the difficulty level
3. Players take turns placing their marks (X or O) in empty squares
4. The first player to get 3 of their marks in a row (horizontally, vertically, or diagonally) wins
5. If all squares are filled and no player has won, the game is a draw

## Game Controls

- Click on any empty square to place your mark
- Use the "Restart Game" button to start a new game
- Use the "Reset Score" button to clear the scoreboard
- Select game mode and difficulty using the dropdown menus

## Technical Implementation

- Uses React Hooks for state management
- Implements the Minimax algorithm with Alpha-Beta pruning for the AI
- Responsive design using CSS Grid and Flexbox
- Visual feedback for winning combinations using CSS animations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Mozilla Public License 2.0 (MPL-2.0) - see the [LICENSE](LICENSE) file for details.
