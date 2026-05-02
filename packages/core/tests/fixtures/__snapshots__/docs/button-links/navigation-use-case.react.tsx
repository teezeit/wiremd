import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <nav className="wmd-nav">
    <div className="wmd-nav-content">
      <div className="wmd-brand">wiremd</div>
      <a href="./index.md" className="wmd-nav-item">Home</a>
      <a href="./buttons.md" className="wmd-nav-item">Components</a>
      <a href="./columns.md" className="wmd-nav-item">Layout</a>
      <a href="./index.md" className="wmd-nav-item wmd-nav-item-primary">Get Started</a>
    </div>
  </nav>
    </div>
  );
};