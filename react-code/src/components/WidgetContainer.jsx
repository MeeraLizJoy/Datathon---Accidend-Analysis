// WidgetContainer.js
import React from 'react';
import '../styles/WidgetContainer.css'; // Create a corresponding CSS file for styling

const WidgetContainer = ({ children, className = '' }) => {
  return <div className={`widget-container ${className}`}>{children}</div>;
};

export default WidgetContainer;
