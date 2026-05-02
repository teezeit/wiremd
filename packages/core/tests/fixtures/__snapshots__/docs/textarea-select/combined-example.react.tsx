import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <h2 className="wmd-h2">Feedback</h2>
  <div className="wmd-container-form-group">
Category
    <select className="wmd-select" >
    <option value="" disabled defaultSelected>Select category</option>
    <option value="Bug report">Bug report</option>
    <option value="Feature request">Feature request</option>
    <option value="General feedback">General feedback</option>
    </select>
  </div>
  <div className="wmd-container-form-group">
Description
    <textarea className="wmd-textarea" rows={5} placeholder="Describe the issue..." required>
      
    </textarea>
  </div>
  <div className="wmd-row">
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        Submit Feedback
      </button>
    </div>
    <div className="wmd-grid-item">
      <button className="wmd-button">
        Cancel
      </button>
    </div>
  </div>
    </div>
  );
};