import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <h3 className="wmd-h3">Launch checklist</h3>
    <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
      <div className="wmd-grid-item">
        <h3 className="wmd-h3">Content</h3>
        <div className="wmd-container-form-group">
Title
          <input type="text" className="wmd-input" placeholder="Spring campaign" required />
        </div>
        <div className="wmd-container-form-group">
Audience
          <select className="wmd-select" required>
    <option value="" disabled defaultSelected>Select audience</option>
    <option value="All users">All users</option>
    <option value="Trial users">Trial users</option>
    <option value="Enterprise customers">Enterprise customers</option>
          </select>
        </div>
        <p className="wmd-paragraph">Delivery channel</p>
        <ul className="wmd-list">
          <label className="wmd-radio">
            <input type="radio" defaultChecked name="radio-group-1" />
            <span>Email</span>
          </label>
          <label className="wmd-radio">
            <input type="radio" name="radio-group-1" />
            <span>Push notification</span>
          </label>
          <label className="wmd-radio">
            <input type="radio" name="radio-group-1" />
            <span>In-app banner</span>
          </label>
        </ul>
      </div>
      <div className="wmd-grid-item">
        <h3 className="wmd-h3">Controls</h3>
        <label className="wmd-switch">
          <span className="wmd-switch-label">Schedule send</span>
          <input type="checkbox" role="switch" />
          <span className="wmd-switch-track"><span className="wmd-switch-thumb"></span></span>
        </label>
        <label className="wmd-switch">
          <span className="wmd-switch-label">Require approval</span>
          <input type="checkbox" role="switch" defaultChecked />
          <span className="wmd-switch-track"><span className="wmd-switch-thumb"></span></span>
        </label>
        <label className="wmd-switch">
          <span className="wmd-switch-label">Lock after publish</span>
          <input type="checkbox" role="switch" disabled />
          <span className="wmd-switch-track"><span className="wmd-switch-thumb"></span></span>
        </label>
        <div className="wmd-row wmd-right">
          <div className="wmd-grid-item">
            <button className="wmd-button">
              Preview
            </button>
          </div>
          <div className="wmd-grid-item">
            <button className="wmd-button wmd-button-primary">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};