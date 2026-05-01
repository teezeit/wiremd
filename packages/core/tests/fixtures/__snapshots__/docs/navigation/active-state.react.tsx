import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <nav className="wmd-nav">
    <div className="wmd-nav-content">
      <div className="wmd-brand">Logo</div>
      <a href="#" className="wmd-nav-item">Home</a>
      <a href="#" className="wmd-nav-item wmd-active">Products</a>
      <a href="#" className="wmd-nav-item">About</a>
      <a href="#" className="wmd-nav-item">Contact</a>
    </div>
  </nav>
    </div>
  );
};