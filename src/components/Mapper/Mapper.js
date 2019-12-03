import React, { useState } from 'react';
import { Map, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import './Mapper.css';

function Mapper ({position, zoom}){
  return(
    <Map className="map" center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
}

export default Mapper;
