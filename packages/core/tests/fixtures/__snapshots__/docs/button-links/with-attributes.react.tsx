import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-secondary">
        Sign Up
      </button>
    </div>
  </div>
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-danger">
        Cancel
      </button>
    </div>
  </div>
    </div>
  );
};