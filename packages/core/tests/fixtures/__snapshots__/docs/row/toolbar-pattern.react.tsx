import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
    <div className="wmd-grid-item">
      <h3 className="wmd-h3"></h3>
      <div className="wmd-container-form-group">
<strong>Projects</strong>
 
        <span className="wmd-badge wmd-badge-primary">12</span>
      </div>
    </div>
    <div className="wmd-grid-item wmd-align-right">
      <h3 className="wmd-h3 wmd-right"></h3>
      <div className="wmd-row">
        <div className="wmd-grid-item">
          <button className="wmd-button">
            Filter
          </button>
        </div>
        <div className="wmd-grid-item">
          <button className="wmd-button">
            Sort
          </button>
        </div>
        <div className="wmd-grid-item">
          <button className="wmd-button wmd-button-primary">
            + New Project
          </button>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};