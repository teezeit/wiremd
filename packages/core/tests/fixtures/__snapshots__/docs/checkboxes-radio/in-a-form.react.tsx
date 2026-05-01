import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <h2 className="wmd-h2">Preferences</h2>
  <ul className="wmd-list">
    <label className="wmd-checkbox">
      <input type="checkbox" defaultChecked  />
      <span>Send me product updates</span>
    </label>
    <label className="wmd-checkbox">
      <input type="checkbox"  />
      <span>Send me marketing emails</span>
    </label>
    <label className="wmd-checkbox">
      <input type="checkbox" defaultChecked  />
      <span>Enable two-factor authentication</span>
    </label>
    <label className="wmd-checkbox">
      <input type="checkbox"  />
      <span>Make my profile public</span>
    </label>
  </ul>
  <button className="wmd-button wmd-button-primary">
    Save Preferences
  </button>
    </div>
  );
};