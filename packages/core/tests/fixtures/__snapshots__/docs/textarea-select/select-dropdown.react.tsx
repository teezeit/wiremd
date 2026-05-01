import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-form-group">
Country
    <select className="wmd-select" >
    <option value="" disabled defaultSelected>Select country</option>
    <option value="United States">United States</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="Germany">Germany</option>
    <option value="France">France</option>
    </select>
  </div>
    </div>
  );
};