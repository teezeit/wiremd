import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">What you get</h3>
      <ul className="wmd-list">
        <li className="wmd-list-item">Unlimited wireframes</li>
        <li className="wmd-list-item">7 visual styles</li>
        <li className="wmd-list-item">VS Code extension</li>
        <li className="wmd-list-item">CLI tool</li>
      </ul>
    </div>
    <div className="wmd-grid-item wmd-card">
      <h3 className="wmd-h3">What you don&#039;t need</h3>
      <ul className="wmd-list">
        <li className="wmd-list-item">Figma licence</li>
        <li className="wmd-list-item">Design skills</li>
        <li className="wmd-list-item">Build step
:::</li>
      </ul>
    </div>
  </div>
    </div>
  );
};