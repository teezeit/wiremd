import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-form-group">
Workspace
    <select className="wmd-select wmd-navigation-select" onChange={(event) => { const target = event.currentTarget; if (target.value) window.location.href = target.value; }}>
    <option value="" disabled defaultSelected>Workspace</option>
    <option value="./acme.md" data-href="./acme.md">Acme Inc</option>
    <option value="./personal.md" data-href="./personal.md">Personal</option>
    <option value="./new-workspace.md" data-href="./new-workspace.md">Create workspace</option>
    </select>
  </div>
    </div>
  );
};