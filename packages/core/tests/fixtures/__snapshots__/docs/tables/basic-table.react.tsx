import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <table className="wmd-table">
      <thead>
        <tr>
              <th className="wmd-table-cell wmd-align-left">Name</th>
              <th className="wmd-table-cell wmd-align-left">Role</th>
              <th className="wmd-table-cell wmd-align-left">Status</th>
        </tr>
      </thead>
    <tbody>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Alice M.</td>
              <td className="wmd-table-cell wmd-align-left">Admin</td>
              <td className="wmd-table-cell wmd-align-left">Active</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Bob K.</td>
              <td className="wmd-table-cell wmd-align-left">Editor</td>
              <td className="wmd-table-cell wmd-align-left">Active</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Clara T.</td>
              <td className="wmd-table-cell wmd-align-left">Viewer</td>
              <td className="wmd-table-cell wmd-align-left">Inactive</td>
          </tr>
    </tbody>
  </table>
    </div>
  );
};