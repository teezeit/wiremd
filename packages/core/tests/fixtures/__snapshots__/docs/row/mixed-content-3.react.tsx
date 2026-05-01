import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <span className="wmd-icon" data-icon="user" aria-label="user">👤</span>
    </div>
    <div className="wmd-grid-item">
      <p className="wmd-paragraph">John Doe <span className="wmd-badge wmd-badge-warning">Admin</span></p>
    </div>
    <div className="wmd-grid-item">
      <div className="wmd-container-button-group">
        <button className="wmd-button">
          Edit
        </button>
        <button className="wmd-button wmd-danger">
          Remove
        </button>
      </div>
    </div>
  </div>
    </div>
  );
};