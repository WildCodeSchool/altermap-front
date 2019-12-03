import React, { useState } from 'react';
import './App.css';
import Mapper from './components/Mapper/Mapper';

function App () {
  const [coords, setCoords] = useState({
    location :{
      lat: 42.6976,
      lng: 2.8954
    },
    haveUserLocation:false,
    zoom: 8,
  });

  const position = [coords.location.lat, coords.location.lng]

  return (
    <div className="App">
      <Mapper position={position} zoom={coords.zoom} />
    </div>
  );
}

export default App;
