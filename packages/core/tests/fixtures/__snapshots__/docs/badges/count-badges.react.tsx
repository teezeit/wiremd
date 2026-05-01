import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <p className="wmd-paragraph">Inbox <span className="wmd-badge wmd-badge-primary">12</span></p>
  <p className="wmd-paragraph">Alerts <span className="wmd-badge wmd-badge-error">3</span></p>
  <p className="wmd-paragraph">Updates <span className="wmd-badge wmd-badge-success">New</span></p>
    </div>
  );
};