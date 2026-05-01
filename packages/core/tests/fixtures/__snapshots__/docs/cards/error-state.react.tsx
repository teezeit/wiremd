import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-error-state">
    <h3 className="wmd-h3">Failed to load</h3>
    <p className="wmd-paragraph">Could not connect to the server. Check your connection and try again.</p>
    <button className="wmd-button wmd-button-primary">
      Retry
    </button>
  </div>
    </div>
  );
};