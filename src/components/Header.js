import React from 'react';

const Header = ({ isDarkMode, onThemeToggle }) => {
  return (
    <div className="header">
      <h1>Jogo da Velha</h1>
      <button 
        className="theme-toggle" 
        onClick={onThemeToggle}
        aria-label="Alternar tema"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default Header;
