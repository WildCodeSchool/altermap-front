import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, TileLayer, ZoomControl, FeatureGroup } from "react-leaflet";
import { BoxZoomControl } from "react-leaflet-box-zoom";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "./Mapper.css";
import ConstructionSiteForm from "../ConstructionSiteForm/ConstructionSiteForm";

function Mapper({ position, zoom, close, setTempCoords }) {
  const [constructionSites, setConstructionSites] = useState(null);
  useEffect(() => {
    axios
      .get("/api/v1/construction-sites")
      .then(response => setConstructionSites(response.data));
  }, []);

  const getGeoJson = () => ({
    type: 'FeatureCollection',
    features: [
      {
        type: "FeatureCollection",
        features: constructionSites.map((polygon, index) => ({
          type: "Feature",
          properties: {
            id: polygon.id
          },
          geometry: {
            type: "Polygon",
            coordinates: [polygon.coords]
          }
        }))
      }
    ]
  });

  const featureGroupReady = (reactFGref) => {
    const leafletGeoJSON = new L.GeoJSON(getGeoJson());
    const leafletFG = reactFGref.leafletElement;
    leafletGeoJSON.eachLayer((layer) => {
      leafletFG.addLayer(layer);
    });
  };

  return (
    <Map
      className="Mapper"
      center={position}
      zoom={zoom}
      zoomControl={false}
      maxZoom={17}
      minZoom={1}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {console.log(constructionSites && constructionSites.map(x => x.coords))}

      <ZoomControl position="topright" />

      <BoxZoomControl position="topright" sticky />
      <FeatureGroup
<<<<<<< HEAD
        ref={
          localStorage.getItem('polygonCoords')
          && ((reactFGref) => featureGroupReady(reactFGref))
        }
=======
        ref={constructionSites && (reactFGref => featureGroupReady(reactFGref))}
>>>>>>> 55c1c3c5429375474e6d3d1795229b1cbe1a72a5
      >
        <EditControl
          position="topright"
          onEdited={(e) => {
            console.log(e);
          }}
          onCreated={(e) => {
            console.log(e);
            const coords = e.layer.editing.latlngs[0][0].map((x) => [
              x.lng,
              x.lat,
            ]);
            setTempCoords(coords);
            return close();
          }}
          onDeleted={(e) => {
            const polygonsDelete = Object.keys(e.layers._layers);
            console.log(e);
            polygonsDelete.map((polygon) => {
              const { id } = e.layers._layers[polygon].feature.properties;
              const { coordinates } = e.layers._layers[
                polygon
              ].feature.geometry;
              const localPolygon = localStorage
<<<<<<< HEAD
                .getItem('polygonCoords')
                .split('#')
                .map((item) => item.split('/').map((x) => x.split(',').map((y) => Number(y))));
              console.log(
                JSON.stringify(localPolygon[id])
                  === JSON.stringify(coordinates[0]),
              );
              console.log('Array polygon before :', localPolygon);
=======
                .getItem("polygonCoords")
                .split("#")
                .map(item =>
                  item.split("/").map(x => x.split(",").map(y => Number(y)))
                );
              console.log("Array polygon before :", localPolygon);
>>>>>>> 55c1c3c5429375474e6d3d1795229b1cbe1a72a5
              const result = localPolygon.splice(id, 1);
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
