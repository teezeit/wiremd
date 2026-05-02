import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-form-group">
Project actions
    <select className="wmd-select wmd-action-select" >
    <option value="" disabled defaultSelected>Actions</option>
    <option value="Duplicate" data-action="Duplicate">Duplicate</option>
    <option value="Archive" data-action="Archive">Archive</option>
    <option value="Delete" data-action="Delete">Delete</option>
    </select>
  </div>
    </div>
  );
};