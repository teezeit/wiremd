import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-form-group">
Role
    <select className="wmd-select" required>
    <option value="" disabled defaultSelected>Select a role</option>
    <option value="Admin">Admin</option>
    <option value="Editor">Editor</option>
    <option value="Viewer">Viewer</option>
    </select>
  </div>
    </div>
  );
};