import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <h1 className="wmd-h1">Outer</h1>
    <p className="wmd-paragraph">some text directly before the inner opener</p>
    <div className="wmd-container-card">
      <h2 className="wmd-h2">Inner</h2>
      <button className="wmd-button wmd-button-primary">
        Action
      </button>
    </div>
  </div>
    </div>
  );
};