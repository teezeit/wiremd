import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-small">
        Small
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Default
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-large">
        Large
      </button>
    </div>
  </div>
    </div>
  );
};