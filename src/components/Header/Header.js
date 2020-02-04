import React, { useState } from 'react';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

function Header({ disconnect, setZoom, setPosition }) {
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [search, setSearch] = useState('');

  const validDestination = (coords, nom) => {
    setSearch(nom);
    setPosition(coords);
    setZoom(10);
    setShowResult(false);
  };

  return (
    <div>
      <header className="Header">
        <div className="Header__logo">
          <img className="Header__logo-image" src="/images/logo.png" alt="logo" />
        </div>

        <SearchBar setZoom={setZoom} setPosition={setPosition} setSearchResult={setSearchResult} setShowResult={setShowResult} search={search} setSearch={setSearch} />

        <button className="Header__exitButton" title='Déconnexion' onClick={(e) => { e.preventDefault(); disconnect(); }}><Icon icon={faPowerOff} /></button>

      </header>
      {
        searchResult.length > 0 && showResult
        && (
          <div className="SearchBar__result">
            {
              searchResult.map((city) => (
                <button
                  type="button"
                  onClick={() => validDestination(city.coordinates, city.nom)}
                  key={`${city.nom} ${Math.random() * 45 + 5}`}
                  className="SearchBar__button"
                >
                  {city.nom}
                  <span className="SearchBar__button--postal-code">
                    {city.code.substring(0, 2)}
                  </span>
                </button>
              ))
            }
          </div>
        )
      }
    </div>
  );
}

export default Header;
