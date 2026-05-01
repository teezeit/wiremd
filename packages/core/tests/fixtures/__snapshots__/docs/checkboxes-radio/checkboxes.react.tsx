import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <ul className="wmd-list">
    <label className="wmd-checkbox">
      <input type="checkbox"  />
      <span>Email notifications</span>
    </label>
    <label className="wmd-checkbox">
      <input type="checkbox" defaultChecked  />
      <span>SMS alerts</span>
    </label>
    <label className="wmd-checkbox">
      <input type="checkbox"  />
      <span>Weekly digest</span>
    </label>
    <label className="wmd-checkbox">
      <input type="checkbox" defaultChecked  />
      <span>Product updates</span>
    </label>
  </ul>
    </div>
  );
};