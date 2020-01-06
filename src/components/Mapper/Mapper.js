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

function Mapper({ position, zoom, close }) {
  // Hook des données des polygons
  const [constructionSites, setConstructionSites] = useState([]);
  const [tempCoords, setTempCoords] = useState(null);
  const [updatingConstructionSite, setUpdatingConstructionSite] = useState(null);

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

  // useEffect pour la création de la carte
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
              // Récupération des numéro de l'object modifié
              const polygonsEdit = Object.keys(e.layers._layers);
              polygonsEdit.map((polygon) => {
                // Récupération de l'id du polygon
                const { id } = e.layers._layers[polygon].feature.properties;
                // Récupération des coordonnées
                const coords = e.layers._layers[polygon]._latlngs[0].map(
                  (point) => [point.lng, point.lat],
                );
                // Set de l'id à changer
                setUpdatingConstructionSite(id);
                // Création des coordonnées temporaires
                setTempCoords(coords);
                return true;
              });
            }}
            // Création des polygons
            onCreated={(e) => {
              // Récupération des coordonnées du polygon
              const coords = e.layer.editing.latlngs[0][0].map((x) => [
                x.lng,
                x.lat,
              ]);
              // Création des coordonnées temporaires
              setTempCoords(coords);
            }}
            onDeleted={(e) => {
              // Récupération des numéros des objets à supprimer
              const polygonsDelete = Object.keys(e.layers._layers);
              polygonsDelete.map((polygon) => {
                // Récupération de l'id du polygon
                const { id } = e.layers._layers[polygon].feature.properties;
                // Récupération des coordonnées
                const { coords } = e.layers._layers[
                  polygon
                ].feature.geometry;
                // Affichage de la future popup pour la suppression
                // Delete du polygon
                return axios.delete(`/api/v1/construction-sites/${id}`);
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
