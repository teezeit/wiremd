import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <p className="wmd-paragraph"><span className="wmd-badge">Default</span><span className="wmd-badge wmd-badge-primary">Primary</span><span className="wmd-badge wmd-badge-success">Success</span><span className="wmd-badge wmd-badge-warning">Warning</span><span className="wmd-badge wmd-badge-error">Error</span></p>
    </div>
  );
};