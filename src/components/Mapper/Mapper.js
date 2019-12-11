import React from 'react';
import {
  Map, TileLayer, ZoomControl, FeatureGroup,
} from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import './Mapper.css';

function Mapper({ position, zoom }) {
  const getGeoJson = () => ({
    type: 'FeatureCollection',
    features: [
      {
        type: 'FeatureCollection',
        features:
          localStorage.getItem('polygonCoords').split('#').map(
            (polygon, index) => (
              {
                type: 'Feature',
                properties: {
                  id: index,
                },
                geometry: {
                  type: 'Polygon',
                  coordinates:
                    [
                      polygon
                        .split('/')
                        .map((x) => (x.split(',')
                          .map((y) => Number(y))
                        )),
                    ],
                },
              }
            ),
          ),
      },
    ],
  });

  const featureGroupReady = (reactFGref) => {
    const leafletGeoJSON = new L.GeoJSON(getGeoJson());
    const leafletFG = reactFGref.leafletElement;
    leafletGeoJSON.eachLayer((layer) => {
      leafletFG.addLayer(layer);
    });
  };

  return (
    <Map className="Mapper" center={position} zoom={zoom} zoomControl={false} maxZoom={17} minZoom={1}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="topright" />

      <BoxZoomControl
        position="topright"
        sticky
      />
      <FeatureGroup ref={localStorage.getItem('polygonCoords') && ((reactFGref) => featureGroupReady(reactFGref))}>
        <EditControl
          position="topright"
          onEdited={(e) => {
            console.log(e);
          }}
          onCreated={(e) => {
            console.log(e);
            const coords = e.layer.editing.latlngs[0][0].map((x) => [x.lng, x.lat]);
            localStorage.setItem('polygonCoords', `${localStorage.getItem('polygonCoords') ? `${localStorage.getItem('polygonCoords')}#${coords.join('/')}` : `${coords.join('/')}`}`);
          }}
          onDeleted={
            (e) => {
              const polygonsDelete = Object.keys(e.layers._layers);
              console.log(e);
              polygonsDelete.map((polygon) => {
                const { id } = e.layers._layers[polygon].feature.properties;
                const { coordinates } = e.layers._layers[polygon].feature.geometry;
                const localPolygon = localStorage.getItem('polygonCoords')
                  .split('#').map((item) => item.split('/')
                    .map((x) => (x.split(',')
                      .map((y) => Number(y))
                    )));
                console.log(JSON.stringify(localPolygon[id]) === JSON.stringify(coordinates[0]));
                console.log('Array polygon before :', localPolygon);
                const result = localPolygon.splice(id, 1);
              });
            }
          }
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
