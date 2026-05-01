import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <nav className="wmd-nav">
    <div className="wmd-nav-content">
      <div className="wmd-brand"><span className="wmd-icon" data-icon="logo" aria-label="logo">●</span>Brand</div>
      <div className="wmd-brand">Home</div>
      <a href="#" className="wmd-nav-item">Features</a>
      <a href="#" className="wmd-nav-item">Pricing</a>
      <button className="wmd-button">
        Sign In
      </button>
      <button className="wmd-button wmd-button-primary">
        Get Started
      </button>
    </div>
  </nav>
    </div>
  );
};