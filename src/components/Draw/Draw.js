import React from 'react';
import './Draw.css';
import {
  Map, TileLayer, Circle, FeatureGroup,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';


export default function Draw() {
  return (
    <div>
      <FeatureGroup>
        <EditControl
          position="topright"

                // this is the necessary function. It goes through each layer
                // and runs my save function on the layer, converted to GeoJSON
                // which is an organic function of leaflet layers.

          // onEdited={(e) => {
          //   e.layers.eachLayer((a) => {
          //     this.props.updatePlot({
          //       id,
          //       feature: a.toGeoJSON(),
          //     });
          //   });
          // }}
          edit={{ remove: false }}
          draw={{
            marker: false,
            circle: false,
            rectangle: false,
            polygon: false,
            polyline: false,
          }}
        />
      </FeatureGroup>
    </div>
  );
}
