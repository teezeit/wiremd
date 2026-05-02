import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <table className="wmd-table">
      <thead>
        <tr>
              <th className="wmd-table-cell wmd-align-left">Feature</th>
              <th className="wmd-table-cell wmd-align-left">Status</th>
        </tr>
      </thead>
    <tbody>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Auth</td>
              <td className="wmd-table-cell wmd-align-left"><span className="wmd-badge wmd-badge-success">Done</span></td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">API</td>
              <td className="wmd-table-cell wmd-align-left"><span className="wmd-badge wmd-badge-warning">In Progress</span></td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Docs</td>
              <td className="wmd-table-cell wmd-align-left"><span className="wmd-badge">Planned</span></td>
          </tr>
    </tbody>
  </table>
    </div>
  );
};