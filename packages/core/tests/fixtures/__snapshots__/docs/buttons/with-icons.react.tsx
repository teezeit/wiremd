import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button">
        <svg className="wmd-icon" data-icon="search" aria-label="search" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg> Search
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        + New Item
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-danger">
        Delete
      </button>
    </div>
  </div>
    </div>
  );
};