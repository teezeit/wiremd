import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-section">
    <h2 className="wmd-h2">Recent Activity</h2>
    <table className="wmd-table">
        <thead>
          <tr>
                <th className="wmd-table-cell wmd-align-left">User</th>
                <th className="wmd-table-cell wmd-align-left">Action</th>
                <th className="wmd-table-cell wmd-align-left">Time</th>
          </tr>
        </thead>
      <tbody>
            <tr>
                <td className="wmd-table-cell wmd-align-left">Alice</td>
                <td className="wmd-table-cell wmd-align-left">Created project</td>
                <td className="wmd-table-cell wmd-align-left">2 min ago</td>
            </tr>
            <tr>
                <td className="wmd-table-cell wmd-align-left">Bob</td>
                <td className="wmd-table-cell wmd-align-left">Left a comment</td>
                <td className="wmd-table-cell wmd-align-left">15 min ago</td>
            </tr>
            <tr>
                <td className="wmd-table-cell wmd-align-left">Clara</td>
                <td className="wmd-table-cell wmd-align-left">Uploaded file</td>
                <td className="wmd-table-cell wmd-align-left">1 hr ago</td>
            </tr>
      </tbody>
    </table>
  </div>
    </div>
  );
};