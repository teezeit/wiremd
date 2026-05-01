import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-layout wmd-sidebar-main">
    <div className="wmd-container-sidebar">
      <p className="wmd-paragraph">&lt;strong&gt;App&lt;/strong&gt;</p>
      <div className="wmd-container-button-group">
        <button className="wmd-button wmd-button-primary">
          Dashboard
        </button>
        <button className="wmd-button">
          Projects
        </button>
        <button className="wmd-button">
          Settings
        </button>
      </div>
    </div>
    <div className="wmd-container-main">
      <h2 className="wmd-h2">Dashboard</h2>
      <p className="wmd-paragraph">Welcome back! Here&#039;s what&#039;s happening.</p>
    </div>
  </div>
    </div>
  );
};