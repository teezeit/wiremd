import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
    <div className="wmd-grid-item">
      <h3 className="wmd-h3">Current design</h3>
      <p className="wmd-paragraph">The existing layout. Works but feels dated.</p>

    </div>
    <div className="wmd-grid-item">
      <h3 className="wmd-h3">Proposed design</h3>
      <p className="wmd-paragraph">Tighter spacing, stronger hierarchy.</p>
    </div>
  </div>
    </div>
  );
};