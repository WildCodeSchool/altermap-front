import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import axios from 'axios';
import {
  Map, TileLayer, ZoomControl, FeatureGroup, withLeaflet, GeoJSON,
} from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import PrintControlDefault from 'react-leaflet-easyprint';
import './Mapper.css';
import ConstructionSiteForm from '../ConstructionSiteForm/ConstructionSiteForm';
import Popup from '../Popup/Popup';

function Mapper({
  position, zoom, setPopupStatus, popup, displayLayer,
}) {
  // Hook of polygons
  const [constructionSites, setConstructionSites] = useState([]);
  const [staticLayer, setStaticLayer] = useState(null);
  const [tempCoords, setTempCoords] = useState(null);
  const [updatingConstructionSite, setUpdatingConstructionSite] = useState(null);
  const [deletetionEvent, addDeletionEvent] = useState({});

  // Hook for layers
  const featureGroupRef = useRef();

  // Function to display GeoJson
  const getGeoJson = useCallback((coordinates) => ({
    type: 'FeatureCollection',
    features: [
      {
        type: 'FeatureCollection',
        features: coordinates.map((polygon) => ({
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
  }), []);

  // useEffect for the map
  useEffect(() => {
    if (constructionSites.length === 0) { return; }
    const leafletGeoJSON = new L.GeoJSON(getGeoJson(constructionSites));
    const leafletFG = featureGroupRef.current.leafletElement;
    leafletGeoJSON.eachLayer((layer) => {
      leafletFG.addLayer(layer);
    });
  }, [constructionSites, getGeoJson]);

  // wrap `PrintControl` component with `withLeaflet` HOC
  const PrintControl = withLeaflet(PrintControlDefault);
  useEffect(() => {
    if (displayLayer && !staticLayer) {
      axios.get('/geojson/zones_inondables_66.json')
        .then((response) => setStaticLayer(response.data));
    }
  }, [displayLayer, staticLayer]);

  // UseEffect like componentDidMount
  useEffect(() => {
    axios
      .get('/api/v1/construction-sites')
      .then((response) => setConstructionSites(response.data));
  }, []);

  return (
    <div>
      <Map
        className="Mapper"
        center={position}
        zoom={zoom}
        zoomControl={false}
        maxZoom={17} // Set zoom max
        minZoom={6} // Set zoom min
      >
        {/* Fond de carte */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <PrintControl position="topright" sizeModes={['Current']} hideControlContainer={false} />
        <ZoomControl position="topright" />
        <BoxZoomControl position="topright" />
        {/* Feature Group for draw controls */}
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            // Edition of polygons
            onEdited={(e) => {
              // Recovery numbers of modified polygons
              const polygonsEdit = Object.keys(e.layers._layers);
              polygonsEdit.map((polygon) => {
                // Recovery id of polygon
                const { id } = e.layers._layers[polygon].feature.properties;
                // Recovery of coords
                const coords = e.layers._layers[polygon]._latlngs[0].map(
                  (point) => [point.lng, point.lat],
                );
                // Set id of modified polygons
                setUpdatingConstructionSite(id);
                setTempCoords(coords);
                return true;
              });
            }}
            // Creation of polygons
            onCreated={(e) => {
              // Recovery of polygon coords
              const coords = e.layer.editing.latlngs[0][0].map((x) => [
                x.lng,
                x.lat,
              ]);
              setTempCoords(coords);
            }}
            // Deletion of polygons
            onDeleted={(e) => {
              // Open popup
              setPopupStatus(true);
              // store event
              addDeletionEvent(e);
            }}

            edit={{ remove: true }}
            draw={{
              marker: false,
              circle: false,
              rectangle: false,
              polygon: true,
              polyline: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
        {displayLayer && staticLayer && <GeoJSON data={staticLayer} />}
      </Map>
      {tempCoords && (
        <ConstructionSiteForm coords={tempCoords} />
      )}
      {updatingConstructionSite && (
        <ConstructionSiteForm id={updatingConstructionSite} coords={tempCoords} />
      )}
      {
        popup && (
          <Popup setPopupStatus={setPopupStatus} deleteEvent={deletetionEvent} resetDeletionEvent={addDeletionEvent} />
        )
      }
    </div>
  );
}

export default Mapper;
