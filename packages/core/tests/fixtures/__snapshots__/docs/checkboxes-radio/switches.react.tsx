import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <h3 className="wmd-h3">Preferences</h3>
    <label className="wmd-switch">
      <span className="wmd-switch-label">Email notifications</span>
      <input type="checkbox" role="switch" defaultChecked />
      <span className="wmd-switch-track"><span className="wmd-switch-thumb"></span></span>
    </label>
    <label className="wmd-switch">
      <span className="wmd-switch-label">SMS notifications</span>
      <input type="checkbox" role="switch" />
      <span className="wmd-switch-track"><span className="wmd-switch-thumb"></span></span>
    </label>
    <label className="wmd-switch">
      <span className="wmd-switch-label">Auto-save drafts</span>
      <input type="checkbox" role="switch" defaultChecked />
      <span className="wmd-switch-track"><span className="wmd-switch-thumb"></span></span>
    </label>
    <label className="wmd-switch">
      <span className="wmd-switch-label">Experimental features</span>
      <input type="checkbox" role="switch" disabled />
      <span className="wmd-switch-track"><span className="wmd-switch-thumb"></span></span>
    </label>
  </div>
    </div>
  );
};