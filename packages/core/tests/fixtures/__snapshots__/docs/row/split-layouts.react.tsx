import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
    <div className="wmd-grid-item">
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
    <div className="wmd-grid-item wmd-align-right">
      <button className="wmd-button wmd-button-primary">
        + New Item
      </button>
    </div>
  </div>
    </div>
  );
};