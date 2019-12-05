import React from 'react';
import {
  Map, TileLayer, ZoomControl, FeatureGroup,
} from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
import { EditControl } from 'react-leaflet-draw';
// import L from 'leaflet';
import './Mapper.css';

function Mapper({ position, zoom }) {
  return (
    <Map className="Mapper" center={position} zoom={zoom} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="topright" />

      <BoxZoomControl
        position="topright"
        sticky
      />
      <FeatureGroup>
        <EditControl
          position="topright"

                // this is the necessary function. It goes through each layer
                // and runs my save function on the layer, converted to GeoJSON
                // which is an organic function of leaflet layers.

          onEdited={(e) => {
            e.layers.eachLayer((a) => {
              console.log(a);
              this.props.updatePlot({
                feature: a.toGeoJSON(),
              });
            });
          }}
          edit={{ remove: true }}
          draw={{
            marker: false,
            circle: false,
            rectangle: false,
            polygon: true,
            polyline: false,
          }}
        />
      </FeatureGroup>
    </Map>
  );
}

export default Mapper;
