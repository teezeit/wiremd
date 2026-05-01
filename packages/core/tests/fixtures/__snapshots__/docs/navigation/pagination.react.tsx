import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-button-group">
    <button className="wmd-button">
      ← Prev
    </button>
    <button className="wmd-button wmd-button-primary">
      1
    </button>
    <button className="wmd-button">
      2
    </button>
    <button className="wmd-button">
      3
    </button>
    <button className="wmd-button">
      4
    </button>
    <button className="wmd-button">
      Next →
    </button>
  </div>
    </div>
  );
};