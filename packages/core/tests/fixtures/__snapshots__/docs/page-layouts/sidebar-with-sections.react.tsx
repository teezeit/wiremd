import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-layout wmd-sidebar-main">
    <h4 className="wmd-h4">Workspace</h4>
    <div className="wmd-container-button-group">
      <button className="wmd-button wmd-button-primary">
        Overview
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
    <h4 className="wmd-h4">Team</h4>
    <div className="wmd-container-button-group">
      <button className="wmd-button">
        Members
      </button>
      <button className="wmd-button">
        Roles
      </button>
    </div>
    <hr className="wmd-separator" />
    <button className="wmd-button">
      Logout
    </button>
  </div>
  <div className="wmd-container-main">
    <h2 className="wmd-h2">Overview</h2>
    <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
      <div className="wmd-grid-item wmd-card">
        <h3 className="wmd-h3">Tasks Done</h3>
        <p className="wmd-paragraph">&lt;strong&gt;48&lt;/strong&gt; this week</p>
      </div>
      <div className="wmd-grid-item wmd-card">
        <h3 className="wmd-h3">In Progress</h3>
        <p className="wmd-paragraph">&lt;strong&gt;12&lt;/strong&gt; open</p>
      </div>
      <div className="wmd-grid-item wmd-card">
        <h3 className="wmd-h3">Upcoming</h3>
        <p className="wmd-paragraph">&lt;strong&gt;5&lt;/strong&gt; due today</p>
      </div>
    </div>
  </div>
  <p className="wmd-paragraph"></p>
    </div>
  );
};