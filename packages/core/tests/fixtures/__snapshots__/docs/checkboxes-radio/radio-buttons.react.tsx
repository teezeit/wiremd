import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <p className="wmd-paragraph">Subscription plan</p>
  <ul className="wmd-list">
    <label className="wmd-radio">
      <input type="radio" name="radio-group-1" />
      <span>Free — 1 user, 5 projects</span>
    </label>
    <label className="wmd-radio">
      <input type="radio" defaultChecked name="radio-group-1" />
      <span>Pro — 10 users, unlimited projects</span>
    </label>
    <label className="wmd-radio">
      <input type="radio" name="radio-group-1" />
      <span>Enterprise — unlimited everything</span>
    </label>
  </ul>
    </div>
  );
};