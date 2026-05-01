import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <p className="wmd-paragraph">Status: <span className="wmd-badge wmd-badge-success">Active</span></p>
  <p className="wmd-paragraph">Plan: <span className="wmd-badge wmd-badge-primary">Pro</span></p>
  <p className="wmd-paragraph">Build: <span className="wmd-badge wmd-badge-error">Failing</span></p>
  <p className="wmd-paragraph">Review: <span className="wmd-badge wmd-badge-warning">Pending</span></p>
    </div>
  );
};