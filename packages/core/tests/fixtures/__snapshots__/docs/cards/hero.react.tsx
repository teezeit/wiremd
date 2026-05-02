import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-hero">
    <h1 className="wmd-h1">Build wireframes in Markdown</h1>
    <p className="wmd-paragraph">Prototype UIs with plain text — no design tools needed.</p>
    <div className="wmd-row">
      <div className="wmd-grid-item">
        <button className="wmd-button wmd-button-primary">
          Get Started
        </button>
      </div>
      <div className="wmd-grid-item">
        <button className="wmd-button">
          View Examples
        </button>
      </div>
    </div>
  </div>
    </div>
  );
};