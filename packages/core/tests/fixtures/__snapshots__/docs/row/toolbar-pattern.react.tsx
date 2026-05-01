import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item wmd-align-left">
      <div className="wmd-container-form-group">
<strong>Projects</strong>
 
        <span className="wmd-badge wmd-badge-primary">12</span>
      </div>
    </div>
    <div className="wmd-grid-item wmd-align-right">
      <div className="wmd-container-button-group">
        <button className="wmd-button">
          Filter
        </button>
        <button className="wmd-button">
          Sort
        </button>
        <button className="wmd-button wmd-button-primary">
          + New Project
        </button>
      </div>
    </div>
  </div>
    </div>
  );
};