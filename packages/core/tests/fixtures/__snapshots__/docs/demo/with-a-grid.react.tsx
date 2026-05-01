import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Free</h3>
      <div className="wmd-container-form-group">
$0/mo
        <button className="wmd-button">
          Get Started
        </button>
      </div>
    </div>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Pro</h3>
      <div className="wmd-container-form-group">
$12/mo
        <button className="wmd-button wmd-button-primary">
          Start Trial
        </button>
      </div>
    </div>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Enterprise</h3>
      <div className="wmd-container-form-group">
Custom
        <button className="wmd-button">
          Contact Sales
        </button>
      </div>
    </div>
  </div>
    </div>
  );
};