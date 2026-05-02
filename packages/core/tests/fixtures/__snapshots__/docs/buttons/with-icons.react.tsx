import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button">
        <span className="wmd-icon" data-icon="search" aria-label="search">🔍</span> Search
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        + New Item
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-danger">
        Delete
      </button>
    </div>
  </div>
    </div>
  );
};