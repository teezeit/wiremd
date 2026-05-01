import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-card">
    <p className="wmd-paragraph">inside</p>
  </div>
  <p className="wmd-paragraph">text after the (broken) closer</p>
    </div>
  );
};