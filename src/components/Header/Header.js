import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';

function Header({ setZoom, setPosition }) {
  return (
    <header className="Header">
      <Logo />
      <SearchBar setZoom={setZoom} setPosition={setPosition} />
    </header>
  );
}

export default Header;
