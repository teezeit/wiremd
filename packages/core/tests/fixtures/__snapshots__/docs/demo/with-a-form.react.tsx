import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-form-group">
Email
    <input type="email" className="wmd-input" required />
  </div>
  <div className="wmd-container-form-group">
Password
    <input type="password" className="wmd-input" required />
  </div>
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        Sign In
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Forgot password?
      </button>
    </div>
  </div>
    </div>
  );
};