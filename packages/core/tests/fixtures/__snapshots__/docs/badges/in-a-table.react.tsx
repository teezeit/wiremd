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
              <td className="wmd-table-cell wmd-align-left">|Done|&#123;.success&#125;</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">API</td>
              <td className="wmd-table-cell wmd-align-left">|In Progress|&#123;.warning&#125;</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Docs</td>
              <td className="wmd-table-cell wmd-align-left">|Planned|</td>
          </tr>
    </tbody>
  </table>
    </div>
  );
};