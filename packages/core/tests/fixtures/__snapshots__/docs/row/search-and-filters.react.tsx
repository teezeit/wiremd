import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <div className="wmd-container-button-group">
        <input type="search" className="wmd-input" placeholder="Search" />
        <input type="text" className="wmd-input" placeholder="All Teams" />
        <input type="text" className="wmd-input" placeholder="This Week" />
      </div>
    </div>
  </div>
    </div>
  );
};