import React from 'react';
import holbertonLogo from '../assets/holbertonLogo.jpg';
import './Header.css';


function Header() {
  return (
    <header className="App-header">
        <img src={holbertonLogo} className="App-logo" alt="logo" />
        <h1>
          School dashboard
        </h1>
    </header>
  );
}

export default Header;