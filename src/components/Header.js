import React from 'react';
import './Header.css';
import logo from './logo.png';  

const Header = () => {
  return (
    <div className='title'>
        <img src={logo} alt="Hostel Logo" className="logo" />
        <p>HOSTEL HIVE</p>
    </div>
  );
};

export default Header;
