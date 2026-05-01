import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <p className="wmd-paragraph">:user:
John Doe |Admin|&#123;.warning&#125;</p>
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