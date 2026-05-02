import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <nav className="wmd-nav">
    <div className="wmd-nav-content">
      <div className="wmd-brand">App</div>
      <button className="wmd-button">
        Dashboard
      </button>
      <button className="wmd-button">
        Notifications
      </button>
      <button className="wmd-button">
        Settings
      </button>
      <button className="wmd-button">
        JD
      </button>
    </div>
  </nav>
  <div className="wmd-container-layout wmd-sidebar-main">
    <div className="wmd-layout-sidebar">
      <div className="wmd-container-sidebar">
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
        </div>
        <h4 className="wmd-h4">Admin</h4>
        <div className="wmd-container-button-group">
          <button className="wmd-button">
            Users
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
    <div className="wmd-layout-main">
      <h2 className="wmd-h2">Dashboard</h2>
      <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
        <div className="wmd-grid-item wmd-card">
          <h3 className="wmd-h3">Revenue</h3>
          <p className="wmd-paragraph"><strong>$12,400</strong>
+8% this month</p>
        </div>
        <div className="wmd-grid-item wmd-card">
          <h3 className="wmd-h3">Users</h3>
          <p className="wmd-paragraph"><strong>1,240</strong>
+23 this week</p>
        </div>
        <div className="wmd-grid-item wmd-card">
          <h3 className="wmd-h3">Open Tasks</h3>
          <p className="wmd-paragraph"><strong>34</strong>
5 due today</p>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};