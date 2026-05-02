import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-layout wmd-sidebar-main">
    <div className="wmd-layout-sidebar">
      <div className="wmd-container-sidebar">
        <p className="wmd-paragraph"><strong>Acme Co.</strong></p>
        <h4 className="wmd-h4">Workspace</h4>
        <div className="wmd-row">
          <div className="wmd-grid-item">
            <button className="wmd-button wmd-button-primary">
              Overview
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
        <h4 className="wmd-h4">Team</h4>
        <div className="wmd-row">
          <div className="wmd-grid-item">
            <button className="wmd-button">
              Members
            </button>
          </div>
        </div>
        <div className="wmd-row">
          <div className="wmd-grid-item">
            <button className="wmd-button">
              Roles
            </button>
          </div>
        </div>
        <hr className="wmd-separator" />
        <button className="wmd-button">
          Logout
        </button>
      </div>
    </div>
    <div className="wmd-layout-main">
      <h2 className="wmd-h2">Overview</h2>
      <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
        <div className="wmd-grid-item wmd-card">
          <h3 className="wmd-h3">Tasks Done</h3>
          <p className="wmd-paragraph"><strong>48</strong> this week</p>
        </div>
        <div className="wmd-grid-item wmd-card">
          <h3 className="wmd-h3">In Progress</h3>
          <p className="wmd-paragraph"><strong>12</strong> open</p>
        </div>
        <div className="wmd-grid-item wmd-card">
          <h3 className="wmd-h3">Upcoming</h3>
          <p className="wmd-paragraph"><strong>5</strong> due today</p>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};