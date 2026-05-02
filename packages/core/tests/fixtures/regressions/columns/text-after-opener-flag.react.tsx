import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Fast</h3>
      <p className="wmd-paragraph">content</p>
    </div>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Simple</h3>
      <p className="wmd-paragraph">content</p>
    </div>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">Flexible</h3>
      <p className="wmd-paragraph">content</p>
    </div>
  </div>
    </div>
  );
};