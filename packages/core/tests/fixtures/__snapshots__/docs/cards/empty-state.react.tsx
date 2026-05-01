import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-empty-state">
    <h3 className="wmd-h3">No projects yet</h3>
    <p className="wmd-paragraph">Create your first project to get started.</p>
    <button className="wmd-button wmd-button-primary">
      + New Project
    </button>
  </div>
    </div>
  );
};