import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <p className="wmd-paragraph">Notify me via</p>
  <ul className="wmd-list">
    <label className="wmd-radio">
      <input type="radio" defaultChecked  />
      <span>Email</span>
    </label>
    <label className="wmd-radio">
      <input type="radio"  />
      <span>SMS</span>
    </label>
    <label className="wmd-radio">
      <input type="radio"  />
      <span>Push notification</span>
    </label>
  </ul>
    </div>
  );
};