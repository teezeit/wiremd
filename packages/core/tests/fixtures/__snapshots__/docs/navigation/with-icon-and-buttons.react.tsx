import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <nav className="wmd-nav">
    <div className="wmd-nav-content">
      <div className="wmd-brand"><svg className="wmd-icon" data-icon="logo" aria-label="logo" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" /><path d="M10 12l-2 -2.2l.6 -1" /></svg>Brand</div>
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