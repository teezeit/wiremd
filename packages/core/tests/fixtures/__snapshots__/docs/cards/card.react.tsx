import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <h3 className="wmd-h3">Getting Started</h3>
    <p className="wmd-paragraph">Everything you need to build your first wireframe in minutes.</p>
    <div className="wmd-row">
      <div className="wmd-grid-item">
        <button className="wmd-button">
          Read the guide
        </button>
      </div>
      <div className="wmd-grid-item">
        <button className="wmd-button wmd-button-primary">
          View examples
        </button>
      </div>
    </div>
  </div>
    </div>
  );
};