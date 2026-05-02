import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <table className="wmd-table">
      <thead>
        <tr>
              <th className="wmd-table-cell wmd-align-left">Project</th>
              <th className="wmd-table-cell wmd-align-left">Owner</th>
              <th className="wmd-table-cell wmd-align-left">Due</th>
              <th className="wmd-table-cell wmd-align-left">Status</th>
        </tr>
      </thead>
    <tbody>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Website redesign</td>
              <td className="wmd-table-cell wmd-align-left">Alice</td>
              <td className="wmd-table-cell wmd-align-left">Dec 15</td>
              <td className="wmd-table-cell wmd-align-left"><span className="wmd-badge wmd-badge-warning">In Progress</span></td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Mobile app v2</td>
              <td className="wmd-table-cell wmd-align-left">Bob</td>
              <td className="wmd-table-cell wmd-align-left">Jan 10</td>
              <td className="wmd-table-cell wmd-align-left"><span className="wmd-badge wmd-badge-warning">In Progress</span></td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">API migration</td>
              <td className="wmd-table-cell wmd-align-left">Clara</td>
              <td className="wmd-table-cell wmd-align-left">Dec 20</td>
              <td className="wmd-table-cell wmd-align-left"><span className="wmd-badge wmd-badge-primary">Review</span></td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Design system</td>
              <td className="wmd-table-cell wmd-align-left">Dan</td>
              <td className="wmd-table-cell wmd-align-left">Feb 1</td>
              <td className="wmd-table-cell wmd-align-left"><span className="wmd-badge">Planning</span></td>
          </tr>
    </tbody>
  </table>
  <button className="wmd-button wmd-button-primary">
    + New Project
  </button>
    </div>
  );
};