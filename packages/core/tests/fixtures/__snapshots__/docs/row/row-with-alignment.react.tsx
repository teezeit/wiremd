import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row wmd-right">
    <div className="wmd-grid-item">
      <div className="wmd-container-button-group">
        <button className="wmd-button">
          Export
        </button>
        <button className="wmd-button wmd-button-primary">
          + New Item
        </button>
      </div>
    </div>
  </div>
    </div>
  );
};