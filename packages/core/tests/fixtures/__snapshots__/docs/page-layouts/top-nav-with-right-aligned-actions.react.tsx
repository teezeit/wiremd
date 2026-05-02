import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <nav className="wmd-nav">
    <div className="wmd-nav-content">
      <div className="wmd-brand">App</div>
      <button className="wmd-button">
        Dashboard
      </button>
      <button className="wmd-button">
        Projects
      </button>
      <button className="wmd-button">
        Team
      </button>
      <button className="wmd-button">
        Settings
      </button>
      <button className="wmd-button">
        Logout
      </button>
    </div>
  </nav>
  <div className="wmd-row wmd-right">
    <div className="wmd-grid-item">
      <button className="wmd-button wmd-button-primary">
        + New Project
      </button>
    </div>
  </div>
  <h2 className="wmd-h2">Projects</h2>
  <table className="wmd-table">
      <thead>
        <tr>
              <th className="wmd-table-cell wmd-align-left">Name</th>
              <th className="wmd-table-cell wmd-align-left">Status</th>
              <th className="wmd-table-cell wmd-align-left">Updated</th>
        </tr>
      </thead>
    <tbody>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Alpha</td>
              <td className="wmd-table-cell wmd-align-left"><span className="wmd-badge wmd-badge-success">Active</span></td>
              <td className="wmd-table-cell wmd-align-left">Today</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Beta</td>
              <td className="wmd-table-cell wmd-align-left"><span className="wmd-badge wmd-badge-warning">Review</span></td>
              <td className="wmd-table-cell wmd-align-left">Yesterday</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Gamma</td>
              <td className="wmd-table-cell wmd-align-left"></td>
              <td className="wmd-table-cell wmd-align-left">Draft</td>
              <td className="wmd-table-cell wmd-align-left">&#123;&#125;</td>
              <td className="wmd-table-cell wmd-align-left">3 days ago</td>
          </tr>
    </tbody>
  </table>
    </div>
  );
};