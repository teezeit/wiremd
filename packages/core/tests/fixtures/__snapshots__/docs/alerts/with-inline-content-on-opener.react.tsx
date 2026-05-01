import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-alert wmd-warning">
    <p className="wmd-paragraph">Storage limit reached</p>
    <p className="wmd-paragraph">Upgrade your plan to continue uploading files.</p>
    <div className="wmd-container-button-group">
      <button className="wmd-button wmd-button-primary">
        Upgrade Now
      </button>
      <button className="wmd-button">
        Dismiss
      </button>
    </div>
  </div>
    </div>
  );
};