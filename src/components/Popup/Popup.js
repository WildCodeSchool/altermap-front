import React, { useState } from 'react';
import './Popup.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Popup({
  setPopupStatus, deleteEvent, resetDeletionEvent, idToDelete, setIdToDelete,
}) {
  const deletePolygon = () => {
    // Recovery number of polygons
    if (deleteEvent) {
      const polygonsToDelete = Object.keys(deleteEvent.layers._layers);
      polygonsToDelete.map((polygon) => {
      // Recovery id of polygon
        const { id } = deleteEvent.layers._layers[polygon].feature.properties;
        // Display of popup for deletion
        // Deletion of polygon
        return axios.delete(`/api/v1/construction-sites/${id}`)
          .then((res) => res.status === 200 && (
            resetDeletionEvent({}),
            setPopupStatus(false),
            window.location.reload()
          ));
      });
    } else {
      return axios.delete(`/api/v1/construction-sites/${idToDelete}`)
        .then((res) => res.status === 200 && (
          setIdToDelete(null),
          setPopupStatus(false),
          window.location.reload()
        ));
    }
  };
  return (
    <div id="Popup">
      <div className="Popup__content">
        <p className="Popup__content--title">
          Voulez-vous vraiment supprimer ce chantier ?
        </p>
        <div className="Popup__content--buttons">
          <button type="button" className="Popup__content--button" onClick={() => deletePolygon()}>
            Oui
          </button>
          <button type="button" className="Popup__content--button" onClick={() => window.location.reload()}>
            Non
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
