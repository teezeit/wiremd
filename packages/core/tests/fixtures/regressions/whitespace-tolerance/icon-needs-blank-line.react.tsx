import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <div className="wmd-container-form-group">
:user:
John Doe |Admin|&#123;.warning&#125;
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