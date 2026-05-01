import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <h2 className="wmd-h2">Create Account</h2>
  <div className="wmd-container-form-group">
First name
    <input type="text" className="wmd-input" required />
  </div>
  <div className="wmd-container-form-group">
Last name
    <input type="text" className="wmd-input" required />
  </div>
  <div className="wmd-container-form-group">
Email
    <input type="email" className="wmd-input" required />
  </div>
  <div className="wmd-container-form-group">
Password
    <input type="password" className="wmd-input" required />
  </div>
  <div className="wmd-container-button-group">
    <button className="wmd-button wmd-button-primary">
      Create Account
    </button>
    <button className="wmd-button">
      Cancel
    </button>
  </div>
    </div>
  );
};