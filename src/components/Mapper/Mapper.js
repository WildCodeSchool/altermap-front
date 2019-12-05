/* eslint-disable react/prop-types */
import React from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
// import L from 'leaflet';
import './Mapper.css';

function Mapper({ position, zoom }) {
  return (
    <Map className="Mapper" center={position} zoom={zoom} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="topright" className="controls" />

      <BoxZoomControl
        position="topright"
        sticky
      />
    </Map>
  );
}

export default Mapper;
