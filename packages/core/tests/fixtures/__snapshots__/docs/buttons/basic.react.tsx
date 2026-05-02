import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Cancel
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        Save
      </button>
    </div>
  </div>
    </div>
  );
};