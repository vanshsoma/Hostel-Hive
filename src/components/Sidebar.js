import React from 'react';
import { Link } from 'react-router-dom';  // Import Link
import './Sidebar.css';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/laundry">LAUNDRY</Link></li>
        <li><Link to="/complaints">COMPLAINTS</Link></li>
        <li><Link to="/attendance">ATTENDANCE</Link></li>
        <li><Link to="/food-menu">FOOD MENU</Link></li>
        <li><Link to="/guests-delivery">GUESTS / DELIVERY</Link></li>
        <li><Link to="/leave-application">LEAVE APPLICATION</Link></li>
        <li><Link to="/places-near-you">PLACES NEAR YOU</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
