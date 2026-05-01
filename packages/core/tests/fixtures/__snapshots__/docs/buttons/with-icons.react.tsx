import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-button-group">
    <button className="wmd-button">
      <span className="wmd-icon" data-icon="search" aria-label="search">🔍</span> Search
    </button>
    <button className="wmd-button wmd-button-primary">
      + New Item
    </button>
    <button className="wmd-button wmd-danger">
      Delete
    </button>
  </div>
    </div>
  );
};