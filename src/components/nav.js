import React from 'react';
import './nav.css';
import Logo from './images/logo.png';

function Nav({ className }) {
  return <div className={`nav-container ${className}`}><img src={Logo} /></div>;
}

export default Nav;