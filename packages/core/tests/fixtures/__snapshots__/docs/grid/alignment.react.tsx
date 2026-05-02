import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
    <div className="wmd-grid-item">
      <div className="wmd-row">
        <div className="wmd-grid-item">
          <button className="wmd-button">
            reset
          </button>
        </div>
        <div className="wmd-grid-item">
          <input type="search" className="wmd-input" placeholder="Search" />
        </div>
      </div>
    </div>
    <div className="wmd-grid-item wmd-align-right">
      <button className="wmd-button wmd-button-primary">
        + New Sprint
      </button>
    </div>
  </div>
    </div>
  );
};