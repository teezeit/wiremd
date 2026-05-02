import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-row wmd-align-bottom">
    <div className="wmd-grid-item">
      <textarea className="wmd-textarea" rows={3} placeholder="Notes...">
        
      </textarea>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Cancel
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        Save
      </button>
    </div>
  </div>
    </div>
  );
};