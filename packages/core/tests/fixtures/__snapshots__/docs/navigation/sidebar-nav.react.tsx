import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-sidebar">
    <p className="wmd-paragraph"><strong>App</strong></p>
    <h4 className="wmd-h4">Main</h4>
    <div className="wmd-row">
      <div className="wmd-grid-item">
        <button className="wmd-button wmd-button-primary">
          Dashboard
        </button>
      </div>
    </div>
    <div className="wmd-row">
      <div className="wmd-grid-item">
        <button className="wmd-button">
          Projects
        </button>
      </div>
    </div>
    <div className="wmd-row">
      <div className="wmd-grid-item">
        <button className="wmd-button">
          Tasks
        </button>
      </div>
    </div>
    <div className="wmd-row">
      <div className="wmd-grid-item">
        <button className="wmd-button">
          Calendar
        </button>
      </div>
    </div>
    <h4 className="wmd-h4">Account</h4>
    <div className="wmd-row">
      <div className="wmd-grid-item">
        <button className="wmd-button">
          Settings
        </button>
      </div>
    </div>
    <div className="wmd-row">
      <div className="wmd-grid-item">
        <button className="wmd-button">
          Billing
        </button>
      </div>
    </div>
    <hr className="wmd-separator" />
    <button className="wmd-button">
      Logout
    </button>
  </div>
    </div>
  );
};