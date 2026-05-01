import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <nav className="wmd-nav">
    <div className="wmd-nav-content">
      <div className="wmd-brand">Acme</div>
      <a href="./index.md" className="wmd-nav-item">Home</a>
      <a href="#" className="wmd-nav-item">Products</a>
      <a href="#" className="wmd-nav-item">Pricing</a>
      <button className="wmd-button">
        Login
      </button>
      <button className="wmd-button wmd-button-primary">
        Sign Up
      </button>
    </div>
  </nav>
  <h2 className="wmd-h2">Welcome to Acme</h2>
  <p className="wmd-paragraph">Build faster with our platform.</p>
  <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Feature One</h3>
      <p className="wmd-paragraph">Description of the first feature goes here.</p>
    </div>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Feature Two</h3>
      <p className="wmd-paragraph">Description of the second feature goes here.</p>
    </div>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Feature Three</h3>
      <p className="wmd-paragraph">Description of the third feature goes here.</p>
    </div>
  </div>
    </div>
  );
};