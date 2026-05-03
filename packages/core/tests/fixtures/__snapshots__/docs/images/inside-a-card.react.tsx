import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <h2 className="wmd-h2">Hero Card</h2>
    <div className="wmd-container-form-group">
      <img src="https://picsum.photos/seed/wiremd2/600/200" alt="Feature preview" className="wmd-image"  />
    </div>
    <p className="wmd-paragraph">A short description of the feature shown above.</p>
    <div className="wmd-row">
      <div className="wmd-grid-item">
        <button className="wmd-button wmd-button-primary">
          Learn More
        </button>
      </div>
      <div className="wmd-grid-item">
        <button className="wmd-button">
          Dismiss
        </button>
      </div>
    </div>
  </div>
    </div>
  );
};