import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <button className="wmd-button wmd-button-primary">
      Action
    </button>
    <p className="wmd-paragraph">this text should be a separate paragraph below the button</p>
  </div>
    </div>
  );
};