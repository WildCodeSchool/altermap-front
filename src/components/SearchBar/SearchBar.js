import React, { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function SearchBar({ setZoom, setPosition, setShowResult, setSearchResult, search, setSearch }) {

  const fetchResult = async (value) => {
    const result = await axios.post('/api/v1/cities', { search: value });
    setSearchResult(result.data);
    setShowResult(true);
  };

  const latLong = () => {
    if (search.substring(0, 1) === ':' && search.includes(',')) {
      const numbers = search.substring(1, search.length).split(',').map((coord) => Number(coord));
      if (!isNaN(numbers[0]) && !isNaN(numbers[1])) {
        setPosition(numbers);
        setZoom(16);
      } else {
        setSearch(`:${isNaN(numbers[0]) ? 0 : numbers[0]},${isNaN(numbers[1]) ? 0 : numbers[1]}`);
      }
    }
  };

  return (
    <div className="SearchBar">
      <form
        className="SearchBar__form"
        onSubmit={(e) => {
          e.preventDefault();
          latLong();
        }}
      >
        <input
          type="text"
          className="SearchBar__form--input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchResult(e.target.value);
          }}
          placeholder="Perpignan"
        />
        <Icon icon={faSearchLocation} className="SearchBar__input--icon" />
      </form>
    </div>
  );
}
