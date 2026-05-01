import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Free</h3>
      <p className="wmd-paragraph">$0 / month</p>
      <ul className="wmd-list">
        <li className="wmd-list-item">1 user</li>
        <li className="wmd-list-item">5 projects</li>
      </ul>
      <button className="wmd-button">
        Get Started
      </button>
    </div>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Pro</h3>
      <p className="wmd-paragraph">$12 / month</p>
      <ul className="wmd-list">
        <li className="wmd-list-item">10 users</li>
        <li className="wmd-list-item">Unlimited projects</li>
      </ul>
      <button className="wmd-button wmd-button-primary">
        Start Trial
      </button>
    </div>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Enterprise</h3>
      <p className="wmd-paragraph">Custom pricing</p>
      <ul className="wmd-list">
        <li className="wmd-list-item">Unlimited users</li>
        <li className="wmd-list-item">SLA support</li>
      </ul>
      <button className="wmd-button">
        Contact Sales
      </button>
    </div>
  </div>
    </div>
  );
};