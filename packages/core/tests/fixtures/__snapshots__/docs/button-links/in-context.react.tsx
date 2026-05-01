import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <h3 className="wmd-h3">Getting Started</h3>
    <p className="wmd-paragraph">Install wiremd and create your first wireframe in minutes.</p>
    <div className="wmd-container-button-group">
      <button className="wmd-button wmd-button-primary">
        Read the Guide
      </button>
      <button className="wmd-button">
        View Examples
      </button>
    </div>
  </div>
    </div>
  );
};