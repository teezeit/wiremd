import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-card wmd-col-span-1">
      <h3 className="wmd-h3 wmd-col-span-1">Starter</h3>
      <p className="wmd-paragraph">$9/mo</p>
    </div>
    <div className="wmd-grid-item wmd-card wmd-col-span-2">
      <h3 className="wmd-h3 wmd-col-span-2">Pro</h3>
      <p className="wmd-paragraph">$29/mo — spans two columns</p>
    </div>
  </div>
    </div>
  );
};