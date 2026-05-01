import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-7" style={{ '--grid-columns': 7 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-card wmd-col-span-5">
      <h3 className="wmd-h3 wmd-col-span-5">Starter</h3>
      <p className="wmd-paragraph">spans five</p>
    </div>
    <div className="wmd-grid-item wmd-card wmd-col-span-1">
      <h3 className="wmd-h3 wmd-col-span-1">Pro</h3>
      <p className="wmd-paragraph">spans one</p>
    </div>
  </div>
    </div>
  );
};