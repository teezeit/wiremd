import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <h2 className="wmd-h2">Sign In</h2>
  <div className="wmd-container-form-group">
Email
    <input type="email" className="wmd-input" required />
  </div>
  <div className="wmd-container-form-group">
Password
    <input type="password" className="wmd-input" required />
  </div>
  <ul className="wmd-list">
    <label className="wmd-checkbox">
      <input type="checkbox"  />
      <span>Remember me</span>
    </label>
  </ul>
  <div className="wmd-container-button-group">
    <button className="wmd-button wmd-button-primary">
      Sign In
    </button>
    <button className="wmd-button">
      Forgot password?
    </button>
  </div>
    </div>
  );
};