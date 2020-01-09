import React from 'react';
import './Popup.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Popup({
  setPopupStatus, deleteEvent, resetDeletionEvent,
}) {
  const deletePolygon = (e) => {
    // Recovery number of polygons
    const polygonsToDelete = Object.keys(e.layers._layers);
    polygonsToDelete.map((polygon) => {
      // Recovery id of polygon
      const { id } = e.layers._layers[polygon].feature.properties;
      // Display of popup for deletion
      // Deletion of polygon
      return axios.delete(`/api/v1/construction-sites/${id}`)
        .then((res) => res.status === 200 && (
          resetDeletionEvent({}),
          setPopupStatus(false),
          window.location.reload()
        ));
    });
  };
  return (
    <div id="Popup">
      <div className="Popup__content">
        <button className="Popup__content--close" type="button" onClick={(e) => { e.preventDefault(); setPopupStatus(false); }}>
          <Icon icon={faTimes} className="Popup__content--close-icon" />
        </button>
        <p className="Popup__content--title">
          Voulez-vous vraiment supprimer ce chantier ?
        </p>
        <div className="Popup__content--buttons">
          <button type="button" className="Popup__content--button" onClick={() => deletePolygon(deleteEvent)}>
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
