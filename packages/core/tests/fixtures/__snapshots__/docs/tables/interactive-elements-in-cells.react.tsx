import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <table className="wmd-table">
      <thead>
        <tr>
              <th className="wmd-table-cell wmd-align-left">Select</th>
              <th className="wmd-table-cell wmd-align-left">Name</th>
              <th className="wmd-table-cell wmd-align-left">Role</th>
              <th className="wmd-table-cell wmd-align-left">Actions</th>
        </tr>
      </thead>
    <tbody>
          <tr>
              <td className="wmd-table-cell wmd-align-left"><label className="wmd-checkbox">
  <input type="checkbox"  />
  <span></span>
</label></td>
              <td className="wmd-table-cell wmd-align-left">Alice</td>
              <td className="wmd-table-cell wmd-align-left"><select className="wmd-select" >
    <option value="" disabled defaultSelected>Admin</option>

</select></td>
              <td className="wmd-table-cell wmd-align-left"><button className="wmd-button">
  Edit
</button><button className="wmd-button wmd-button-danger">
  Delete
</button></td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left"><label className="wmd-checkbox">
  <input type="checkbox" defaultChecked  />
  <span></span>
</label></td>
              <td className="wmd-table-cell wmd-align-left">Bob</td>
              <td className="wmd-table-cell wmd-align-left"><select className="wmd-select" >
    <option value="" disabled defaultSelected>Editor</option>

</select></td>
              <td className="wmd-table-cell wmd-align-left"><button className="wmd-button wmd-button-primary">
  Edit
</button><button className="wmd-button wmd-button-danger">
  Delete
</button></td>
          </tr>
          <tr>
              <td className="wmd-table-cell wmd-align-left"><label className="wmd-checkbox">
  <input type="checkbox"  />
  <span></span>
</label></td>
              <td className="wmd-table-cell wmd-align-left">Carol</td>
              <td className="wmd-table-cell wmd-align-left"><select className="wmd-select" >
    <option value="" disabled defaultSelected>Viewer</option>

</select></td>
              <td className="wmd-table-cell wmd-align-left"><button className="wmd-button">
  Edit
</button><button className="wmd-button wmd-button-danger">
  Delete
</button></td>
          </tr>
    </tbody>
  </table>
    </div>
  );
};