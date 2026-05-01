import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <table className="wmd-table">
      <thead>
        <tr>
              <th className="wmd-table-cell wmd-align-left">Feature</th>
              <th className="wmd-table-cell wmd-align-left">Basic</th>
              <th className="wmd-table-cell wmd-align-left">Pro</th>
              <th className="wmd-table-cell wmd-align-left">Enterprise</th>
        </tr>
      </thead>
    <tbody>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Users</td>
              <td className="wmd-table-cell wmd-align-left">1</td>
              <td className="wmd-table-cell wmd-align-left">10</td>
              <td className="wmd-table-cell wmd-align-left">Unlimited</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Storage</td>
              <td className="wmd-table-cell wmd-align-left">1 GB</td>
              <td className="wmd-table-cell wmd-align-left">50 GB</td>
              <td className="wmd-table-cell wmd-align-left">Custom</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Support</td>
              <td className="wmd-table-cell wmd-align-left">|Community|</td>
              <td className="wmd-table-cell wmd-align-left">|Email|&#123;.warning&#125;</td>
              <td className="wmd-table-cell wmd-align-left">|SLA|&#123;.success&#125;</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">API Access</td>
              <td className="wmd-table-cell wmd-align-left">—</td>
              <td className="wmd-table-cell wmd-align-left">|Yes|&#123;.success&#125;</td>
              <td className="wmd-table-cell wmd-align-left">|Yes|&#123;.success&#125;</td>
          </tr>
    </tbody>
  </table>
    </div>
  );
};