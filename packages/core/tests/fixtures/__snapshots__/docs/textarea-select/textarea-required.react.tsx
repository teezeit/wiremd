import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-form-group">
Bio
    <textarea className="wmd-textarea" rows={3} placeholder="Tell us about yourself..." required>
      
    </textarea>
  </div>
    </div>
  );
};