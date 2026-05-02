import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-3" style={{ '--grid-columns': 3 } as React.CSSProperties}>
    <div className="wmd-grid-item wmd-card wmd-align-top">
      <p className="wmd-paragraph">Pinned to top</p>
    </div>
    <div className="wmd-grid-item wmd-card">
      <p className="wmd-paragraph">This middle column is taller.</p>
      <textarea className="wmd-textarea" rows={4} placeholder="Notes...">
        
      </textarea>
    </div>
    <div className="wmd-grid-item wmd-card wmd-align-bottom">
      <p className="wmd-paragraph">Pinned to bottom</p>
    </div>
  </div>
    </div>
  );
};