import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <p className="wmd-paragraph">Notify me via</p>
  <ul className="wmd-list">
    <label className="wmd-radio">
      <input type="radio" defaultChecked name="radio-group-1" />
      <span>Email</span>
    </label>
    <label className="wmd-radio">
      <input type="radio" name="radio-group-1" />
      <span>SMS</span>
    </label>
    <label className="wmd-radio">
      <input type="radio" name="radio-group-1" />
      <span>Push notification</span>
    </label>
  </ul>
    </div>
  );
};