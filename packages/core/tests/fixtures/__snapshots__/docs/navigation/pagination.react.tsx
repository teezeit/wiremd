import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button">
        ← Prev
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        1
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        2
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        3
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        4
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Next →
      </button>
    </div>
  </div>
    </div>
  );
};