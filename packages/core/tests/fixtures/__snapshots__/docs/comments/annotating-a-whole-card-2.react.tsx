import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <h3 className="wmd-h3">Pro Plan</h3>

    <p className="wmd-paragraph"><strong>$12/mo</strong> · unlimited</p>
    <button className="wmd-button wmd-button-primary">
      Start Trial
    </button>
  </div>
    </div>
  );
};