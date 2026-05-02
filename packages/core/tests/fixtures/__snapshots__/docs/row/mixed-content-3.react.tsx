import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <svg className="wmd-icon" data-icon="user" aria-label="user" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
    </div>
    <div className="wmd-grid-item">
      <p className="wmd-paragraph">John Doe <span className="wmd-badge wmd-badge-warning">Admin</span></p>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Edit
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-danger">
        Remove
      </button>
    </div>
  </div>
    </div>
  );
};