import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <table className="wmd-table">
      <thead>
        <tr>
              <th className="wmd-table-cell wmd-align-left">Left</th>
              <th className="wmd-table-cell wmd-align-center">Center</th>
              <th className="wmd-table-cell wmd-align-right">Right</th>
        </tr>
      </thead>
    <tbody>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Text</td>
              <td className="wmd-table-cell wmd-align-center">Text</td>
              <td className="wmd-table-cell wmd-align-right">100</td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left">Text</td>
              <td className="wmd-table-cell wmd-align-center">Text</td>
              <td className="wmd-table-cell wmd-align-right">2,500</td>
          </tr>
    </tbody>
  </table>
    </div>
  );
};