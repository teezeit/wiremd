import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-modal">
    <h3 className="wmd-h3">Delete project?</h3>
    <p className="wmd-paragraph">This will permanently delete &lt;strong&gt;Acme Redesign&lt;/strong&gt; and all its files. This action cannot be undone.</p>
    <div className="wmd-container-button-group">
      <button className="wmd-button">
        Cancel
      </button>
      <button className="wmd-button wmd-danger">
        Delete
      </button>
    </div>
  </div>
    </div>
  );
};