import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <nav className="wmd-nav">
    <div className="wmd-nav-content">
      <div className="wmd-brand">Logo</div>
      <a href="./index.md" className="wmd-nav-item">Home</a>
      <a href="#" className="wmd-nav-item">Products</a>
      <a href="#" className="wmd-nav-item">Pricing</a>
      <a href="#" className="wmd-nav-item">Login</a>
      <button className="wmd-button wmd-button-primary">
        Sign Up
      </button>
    </div>
  </nav>
    </div>
  );
};