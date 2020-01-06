import React from 'react';
import './Popup.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Popup({ popup, popupStatus }) {
  return (
    <div id="Popup" className={popup ? '' : 'hidden'}>
      <div className="Popup__content">
        <button className="Popup__content--close" type="button" onClick={(e) => { e.preventDefault(); popupStatus(false); }}>
          <Icon icon={faTimes} className="Popup__content--close-icon" />
        </button>
        <p className="Popup__content--title">
          Voulez-vous vraiment supprimer ce chantier ?
        </p>
        <div className="Popup__content--buttons">
          <button type="button" className="Popup__content--button">
            Oui
          </button>
          <button type="button" className="Popup__content--button">
            Non
          </button>
        </div>
      </div>
    </div>
  );
}
