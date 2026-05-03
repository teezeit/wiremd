import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-align-top">
      <h3 className="wmd-h3">Title</h3>
      <p className="wmd-paragraph">Short content here.</p>
    </div>
    <div className="wmd-grid-item wmd-align-bottom">
      <button className="wmd-button wmd-button-primary">
        Save
      </button>
    </div>
  </div>
    </div>
  );
};