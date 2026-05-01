import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
    <div className="wmd-grid-item">
      <h3 className="wmd-h3">Billing address</h3>
      <div className="wmd-container-form-group">
First name
        <input type="text" className="wmd-input" required />
      </div>
      <div className="wmd-container-form-group">
Last name
        <input type="text" className="wmd-input" required />
      </div>
    </div>
    <div className="wmd-grid-item">
      <h3 className="wmd-h3">Shipping address</h3>
      <div className="wmd-container-form-group">
First name
        <input type="text" className="wmd-input" required />
      </div>
      <div className="wmd-container-form-group">
Last name
        <input type="text" className="wmd-input" required />
      </div>
    </div>
  </div>
    </div>
  );
};