import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <nav className="wmd-nav">
    <div className="wmd-nav-content">
      <div className="wmd-brand"><span className="wmd-icon" data-icon="logo" aria-label="logo">●</span>MyApp</div>
      <a href="#" className="wmd-nav-item"><span className="wmd-icon" data-icon="home" aria-label="home">🏠</span>Home</a>
      <a href="#" className="wmd-nav-item"><span className="wmd-icon" data-icon="bell" aria-label="bell">●</span>Alerts</a>
      <a href="#" className="wmd-nav-item"><span className="wmd-icon" data-icon="user" aria-label="user">👤</span>Account</a>
    </div>
  </nav>
    </div>
  );
};