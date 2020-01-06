import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Map, TileLayer, ZoomControl, FeatureGroup,
} from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import './Mapper.css';
import ConstructionSiteForm from '../ConstructionSiteForm/ConstructionSiteForm';

function Mapper({
  position, zoom, close,
}) {
  // Hook des données des polygons
  const [constructionSites, setConstructionSites] = useState([]);
  const [tempCoords, setTempCoords] = useState(null);
  const [updatingConstructionSite, setUpdatingConstructionSite] = useState(null)

  // Hook pour faire référence aux layers
  const featureGroupRef = useRef();

  // UseEffect similaire à componentDidMount
  useEffect(() => {
    axios
      .get('/api/v1/construction-sites')
      .then((response) => setConstructionSites(response.data));
  }, []);

  // Fonction pour afficher le GeoJson
  const getGeoJson = () => ({
    type: 'FeatureCollection',
    features: [
      {
        type: 'FeatureCollection',
        features: constructionSites.map((polygon) => ({
          type: 'Feature',
          properties: {
            id: polygon.id,
          },
          geometry: {
            type: 'Polygon',
            coordinates: [polygon.coords],
          },
        })),
      },
    ],
  });


  useEffect(() => {
    if (constructionSites.length === 0) { return; }
    const leafletGeoJSON = new L.GeoJSON(getGeoJson());
    const leafletFG = featureGroupRef.current.leafletElement;
    leafletGeoJSON.eachLayer((layer) => {
      leafletFG.addLayer(layer);
    });
  }, [constructionSites, getGeoJson]);


  return (
    <div>

      <Map
        className="Mapper"
        center={position}
        zoom={zoom}
        zoomControl={false}
        maxZoom={17} // Set du zoom max
        minZoom={6} // Set du zoom min
      >
        {/* Fond de carte */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ZoomControl position="topright" />

        <BoxZoomControl position="topright" />

        {/* Feature Group qui rassemble les controles de draw */}
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            // Edition des polygons
            onEdited={(e) => {
              const polygonsEdit = Object.keys(e.layers._layers);
              polygonsEdit.map((polygon) => {
                const { id } = e.layers._layers[polygon].feature.properties;
                const number = Object.keys(e.layers._layers);
                const coords = e.layers._layers[number]._latlngs[0].map((point) => [point.lng, point.lat]);
                console.log(id)
                setUpdatingConstructionSite(id)
                setTempCoords(coords)
                return true;
              });

            }}
            // Création des polygons
            onCreated={(e) => {
              const coords = e.layer.editing.latlngs[0][0].map((x) => [
                x.lng,
                x.lat,
              ]);
              setTempCoords(coords);
            }}
            onDeleted={(e) => {
              const polygonsDelete = Object.keys(e.layers._layers);
              polygonsDelete.map((polygon) => {
                const { id } = e.layers._layers[polygon].feature.properties;
                const { coords } = e.layers._layers[
                  polygon
                ].feature.geometry;

                console.log(id)
                return axios.delete(`/api/v1/construction-sites/${id}`)
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
      {tempCoords && (
        <ConstructionSiteForm coords={tempCoords} close={close} />
      )}
      {updatingConstructionSite && (
        <ConstructionSiteForm id={updatingConstructionSite} coords={tempCoords} close={close} />
      )}
    </div>
  );
}

export default Mapper;
