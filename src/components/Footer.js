import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Desenvolvido com ❤️ por Carlos Kvasir</p>
      <p className="linkedin-invite">
        Que tal uma partida? Me encontre no{' '}
        <a 
          href="https://www.linkedin.com/in/seu-linkedin" 
          target="_blank" 
          rel="noopener noreferrer"
          className="linkedin-link"
        >
          LinkedIn <span className="emoji">🎮</span>
        </a>
      </p>
    </footer>
  );
};

export default Footer;
