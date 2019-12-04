import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
// import L from 'leaflet';
import './Mapper.css';

function Mapper({ position, zoom }) {
  return (
    <Map className="Mapper" center={position} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
}

export default Mapper;
