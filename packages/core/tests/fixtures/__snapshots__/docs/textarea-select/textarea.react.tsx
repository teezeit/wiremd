import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-form-group">
Message
    <textarea className="wmd-textarea" rows={4} placeholder="Write your message here...">
      
    </textarea>
  </div>
    </div>
  );
};