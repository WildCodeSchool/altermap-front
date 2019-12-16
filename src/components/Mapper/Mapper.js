import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Map, TileLayer, ZoomControl, FeatureGroup } from "react-leaflet";
import { BoxZoomControl } from "react-leaflet-box-zoom";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "./Mapper.css";
import ConstructionSiteForm from "../ConstructionSiteForm/ConstructionSiteForm";

function Mapper({ position, zoom, close, setTempCoords, tempCoords }) {
  // Hook des données des polygons
  const [constructionSites, setConstructionSites] = useState([]);

  // UseEffect similaire à componentDidMount
  useEffect(() => {
    axios.get("/api/v1/construction-sites").then(response => {
      setConstructionSites(response.data);
    });
  }, []);

  // Fonction pour afficher le GeoJson
  const getGeoJson = () => ({
    type: "FeatureCollection",
    features: [
      {
        type: "FeatureCollection",
        features: constructionSites.map(polygon => {
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

  const featureGroupRef = useRef();

  useEffect(() => {
    if (constructionSites.length === 0) {
      return;
    }
    console.log(featureGroupRef);
    const leafletGeoJSON = new L.GeoJSON(getGeoJson());
    const leafletFG = featureGroupRef.current.leafletElement;
    leafletGeoJSON.eachLayer(layer => {
      leafletFG.addLayer(layer);
    });
  }, [constructionSites]);

  // // Fonction à l'éxécution du Feature Group (Container des contrôles de draw)
  // const featureGroupReady = reactFGref => {
  //   console.log(reactFGref);
  //   console.log(constructionSites);
  //   // if (!constructionSites) {}
  //   const leafletGeoJSON = new L.GeoJSON(getGeoJson());
  //   const leafletFG = reactFGref.leafletElement;
  //   leafletGeoJSON.eachLayer(layer => {
  //     leafletFG.addLayer(layer);
  //   });
  // };

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
      <FeatureGroup ref={featureGroupRef}>
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
            console.log(coords);
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
      {tempCoords && (
        <ConstructionSiteForm tempCoords={tempCoords} close={close} />
      )}
    </Map>
  );
}

export default Mapper;
