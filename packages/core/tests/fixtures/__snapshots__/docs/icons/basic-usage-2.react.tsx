import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-button-group">
    <button className="wmd-button wmd-button-primary">
      <span className="wmd-icon" data-icon="search" aria-label="search">🔍</span> Search
    </button>
    <button className="wmd-button">
      <span className="wmd-icon" data-icon="edit" aria-label="edit">●</span> Edit
    </button>
    <button className="wmd-button wmd-button-danger">
      <span className="wmd-icon" data-icon="delete" aria-label="delete">●</span> Delete
    </button>
  </div>
    </div>
  );
};