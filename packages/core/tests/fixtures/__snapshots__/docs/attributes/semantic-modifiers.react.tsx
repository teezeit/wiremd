import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        Primary
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-secondary">
        Secondary
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-danger">
        Danger
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