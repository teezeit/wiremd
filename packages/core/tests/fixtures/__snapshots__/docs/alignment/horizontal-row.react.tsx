import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Export
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Filter
      </button>
    </div>
  </div>
    </div>
  );
};