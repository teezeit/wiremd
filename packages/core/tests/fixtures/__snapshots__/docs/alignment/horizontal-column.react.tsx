import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-align-left">
      <button className="wmd-button wmd-button-primary">
        Left
      </button>
    </div>
    <div className="wmd-grid-item wmd-align-center">
      <button className="wmd-button wmd-button-primary">
        Center
      </button>
    </div>
    <div className="wmd-grid-item wmd-align-right">
      <button className="wmd-button wmd-button-primary">
        Right
      </button>
    </div>
  </div>
    </div>
  );
};