import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-button-group">
    <button className="wmd-button">
      Default
    </button>
    <button className="wmd-button wmd-button-primary">
      Primary
    </button>
    <button className="wmd-button wmd-button-secondary">
      Secondary
    </button>
    <button className="wmd-button wmd-button-danger">
      Danger
    </button>
  </div>
    </div>
  );
};