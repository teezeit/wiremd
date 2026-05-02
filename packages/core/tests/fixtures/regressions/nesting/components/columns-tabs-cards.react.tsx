import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-grid wmd-grid-2" style={{ '--grid-columns': 2 } as React.CSSProperties}>
    <div className="wmd-grid-item">
      <div className="wmd-container-card">
        <h3 className="wmd-h3">Project Alpha</h3>
        <p className="wmd-paragraph">Primary project controls.</p>
        {/* Unknown node type: tabs */}
      </div>
    </div>
    <div className="wmd-grid-item">
      <div className="wmd-container-card">
        <h3 className="wmd-h3">Filters</h3>
        <input type="search" className="wmd-input" placeholder="Search projects" />
        <select className="wmd-select" >
    <option value="" disabled defaultSelected>Status</option>
    <option value="All">All</option>
    <option value="Active">Active</option>
    <option value="Archived">Archived</option>
        </select>
        <div className="wmd-row">
          <div className="wmd-grid-item">
            <button className="wmd-button">
              Reset
            </button>
          </div>
          <div className="wmd-grid-item">
            <button className="wmd-button wmd-button-primary">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};