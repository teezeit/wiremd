import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-sidebar">
    <p className="wmd-paragraph">&lt;strong&gt;App&lt;/strong&gt;</p>
    <h4 className="wmd-h4">Main</h4>
    <div className="wmd-container-button-group">
      <button className="wmd-button wmd-button-primary">
        Dashboard
      </button>
      <button className="wmd-button">
        Projects
      </button>
      <button className="wmd-button">
        Tasks
      </button>
      <button className="wmd-button">
        Calendar
      </button>
    </div>
    <h4 className="wmd-h4">Account</h4>
    <div className="wmd-container-button-group">
      <button className="wmd-button">
        Settings
      </button>
      <button className="wmd-button">
        Billing
      </button>
    </div>
    <hr className="wmd-separator" />
    <button className="wmd-button">
      Logout
    </button>
  </div>
    </div>
  );
};