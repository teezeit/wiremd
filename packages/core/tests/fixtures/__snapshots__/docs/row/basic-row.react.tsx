import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        All
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Active
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Archived
      </button>
    </div>
  </div>
    </div>
  );
};