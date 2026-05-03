import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <h2 className="wmd-h2">Product Shot</h2>
    <div className="wmd-container-form-group">
      <img src="https://example.com/hero.jpg" alt="Hero image" className="wmd-image"  />
    </div>
    <button className="wmd-button wmd-button-primary">
      Buy Now
    </button>
  </div>
    </div>
  );
};