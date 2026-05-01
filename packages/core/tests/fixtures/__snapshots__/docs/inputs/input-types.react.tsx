import React from 'react';

export const WiremdComponent: React.FC = () => {
  return (
    <div className="wmd-root">
  <div className="wmd-container-form-group">
Email
    <input type="email" className="wmd-input"  />
  </div>
  <div className="wmd-container-form-group">
Password
    <input type="password" className="wmd-input"  />
  </div>
  <div className="wmd-container-form-group">
Phone
    <input type="tel" className="wmd-input"  />
  </div>
  <div className="wmd-container-form-group">
Number
    <input type="number" className="wmd-input"  />
  </div>
  <div className="wmd-container-form-group">
URL
    <input type="url" className="wmd-input"  />
  </div>
  <div className="wmd-container-form-group">
Date
    <input type="date" className="wmd-input"  />
  </div>
  <div className="wmd-container-form-group">
Time
    <input type="time" className="wmd-input"  />
  </div>
  <div className="wmd-container-form-group">
Search
    <input type="search" className="wmd-input"  />
  </div>
  <div className="wmd-container-form-group">
File upload
    <input type="file" className="wmd-input"  />
  </div>
  <div className="wmd-container-form-group">
Color
    <input type="color" className="wmd-input"  />
  </div>
    </div>
  );
};