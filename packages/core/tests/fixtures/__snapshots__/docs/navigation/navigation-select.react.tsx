import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-form-group">
Switch app
    <select className="wmd-select wmd-navigation-select" onChange={(event) => { const target = event.currentTarget; if (target.value) window.location.href = target.value; }}>
    <option value="" disabled defaultSelected>Switch app</option>
    <option value="./jira.md" data-href="./jira.md">Jira</option>
    <option value="./confluence.md" data-href="./confluence.md">Confluence</option>
    <option value="./bitbucket.md" data-href="./bitbucket.md">Bitbucket</option>
    </select>
  </div>
    </div>
  );
};