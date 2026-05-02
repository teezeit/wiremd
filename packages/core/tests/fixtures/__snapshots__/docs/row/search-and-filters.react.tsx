import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <input type="search" className="wmd-input" placeholder="Search" />
    </div>
    <div className="wmd-grid-item">
      <input type="text" className="wmd-input" placeholder="All Teams" />
    </div>
    <div className="wmd-grid-item">
      <input type="text" className="wmd-input" placeholder="This Week" />
    </div>
  </div>
    </div>
  );
};