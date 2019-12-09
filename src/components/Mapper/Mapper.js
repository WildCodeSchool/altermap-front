import React from "react";
import { Map, TileLayer, ZoomControl, FeatureGroup } from "react-leaflet";
import { BoxZoomControl } from "react-leaflet-box-zoom";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "./Mapper.css";

function Mapper({ position, zoom }) {
  const getGeoJson = () => ({
    type: "FeatureCollection",
    features: [
      {
        type: "FeatureCollection",
        features: localStorage
          .getItem("polygonCoords")
          .split("#")
          .map(polygon => ({
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                polygon.split("/").map(x => x.split(",").map(y => Number(y)))
              ]
            }
          }))
      }
    ]
  });

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
      maxZoom={17}
      minZoom={1}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ZoomControl position="topright" />

      <BoxZoomControl position="topright" sticky />
      <FeatureGroup
        ref={reactFGref => {
          localStorage.getItem("polygonCoords") &&
            featureGroupReady(reactFGref);
        }}
      >
        <EditControl
          position="topright"
          onEdited={e => {
            e.layers.eachLayer(a => {
              this.props.updatePlot({
                feature: a.toGeoJSON()
              });
            });
          }}
          onCreated={e => {
            const coords = e.layer.editing.latlngs[0][0].map(x => [
              x.lng,
              x.lat
            ]);
            localStorage.setItem(
              "polygonCoords",
              `${
                localStorage.getItem("polygonCoords")
                  ? `${localStorage.getItem("polygonCoords")}#`
                  : ""
              }${coords.join("/")}`
            );
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
