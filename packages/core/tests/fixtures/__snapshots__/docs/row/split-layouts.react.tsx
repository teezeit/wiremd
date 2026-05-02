import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
    <div className="wmd-grid-item">
      <h3 className="wmd-h3"></h3>
      <div className="wmd-container-button-group">
        <button className="wmd-button wmd-button-primary">
          All
        </button>
        <button className="wmd-button">
          Active
        </button>
        <button className="wmd-button">
          Archived
        </button>
      </div>
    </div>
    <div className="wmd-grid-item wmd-align-right">
      <h3 className="wmd-h3 wmd-right"></h3>
      <button className="wmd-button wmd-button-primary">
        + New Item
      </button>
    </div>
  </div>
    </div>
  );
};