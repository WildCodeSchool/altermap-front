import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, TileLayer, ZoomControl, FeatureGroup } from "react-leaflet";
import { BoxZoomControl } from "react-leaflet-box-zoom";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "./Mapper.css";
import ConstructionSiteForm from "../ConstructionSiteForm/ConstructionSiteForm";

function Mapper({ position, zoom, close, setTempCoords, tempCoords }) {
  // Hook des données des polygons
  const [constructionSites, setConstructionSites] = useState(null);

  // UseEffect similaire à componentDidMount
  useEffect(() => {
    axios
      .get("/api/v1/construction-sites")
      .then(response => setConstructionSites(response.data));
  }, []);

  // Fonction pour afficher le GeoJson
  const getGeoJson = () => ({
    type: "FeatureCollection",
    features: [
      {
        type: "FeatureCollection",
        features: constructionSites.map((polygon, index) => {
          console.log(polygon);
          return {
            type: "Feature",
            properties: {
              id: polygon.id
            },
            geometry: {
              type: "Polygon",
              coordinates: [polygon.coords]
            }
          };
        })
      }
    ]
  });

  // Fonction à l'éxécution du Feature Group (Container des contrôles de draw)
  const featureGroupReady = reactFGref => {
    const leafletGeoJSON = new L.GeoJSON(getGeoJson());
    const leafletFG = reactFGref.leafletElement;
    leafletGeoJSON.eachLayer(layer => {
      leafletFG.addLayer(layer);
    });
  };

  return (
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
      <FeatureGroup
        ref={
          constructionSites &&
          tempCoords &&
          (reactFGref => featureGroupReady(reactFGref))
        }
      >
        <EditControl
          position="topright"
          // Edition des polygons
          onEdited={e => {
            console.log(e);
          }}
          // Création des polygons
          onCreated={e => {
            console.log(e);
            const coords = e.layer.editing.latlngs[0][0].map(x => [
              x.lng,
              x.lat
            ]);
            setTempCoords(coords);
          }}
          // Delétion des polygons
          onDeleted={e => {
            const polygonsDelete = Object.keys(e.layers._layers);
            console.log(e);
            polygonsDelete.map(polygon => {
              const { id } = e.layers._layers[polygon].feature.properties;
              const { coordinates } = e.layers._layers[
                polygon
              ].feature.geometry;
              const localPolygon = localStorage
                .getItem("polygonCoords")
                .split("#")
                .map(item =>
                  item.split("/").map(x => x.split(",").map(y => Number(y)))
                );
              console.log("Array polygon before :", localPolygon);
              const result = localPolygon.splice(id, 1);
            });
          }}
          edit={{ remove: true }}
          draw={{
            marker: false,
            circle: false,
            rectangle: false,
            polygon: true,
            polyline: false
          }}
        />
      </FeatureGroup>
    </Map>
  );
}

export default Mapper;
