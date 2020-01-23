import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header({ disconnect, setZoom, setPosition }) {
  return (
    <header className="Header">
      <Logo />
    
      <SearchBar setZoom={setZoom} setPosition={setPosition} />
      <button className="Header__exitButton" title='Déconnexion' onClick={(e) => { e.preventDefault(); disconnect(); }}><Icon icon={faSignOutAlt} /></button>
    </header>
  );
}

export default Header;
