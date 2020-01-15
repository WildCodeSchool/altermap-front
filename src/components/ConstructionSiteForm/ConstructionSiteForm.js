import React, { useState } from 'react';
import './ConstructionSiteForm.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConstructionSiteForm({ id, coords }) {
  const addHandleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/v1/construction-sites', { name, coords })
      // Refresh de la page si l'envoie à fonctionné
      .then((res) => (res.status === 200 ? window.location.reload() : alert('Error on request')));
  };

  const editHandleSubmit = (event) => {
    // Evite un refresh dont on a pas besoin et permet d'éxécuter les requêtes
    event.preventDefault();
    axios.put(`/api/v1/construction-sites/${id}`, { state, name, coords })
      // Refresh page if request is OK
      .then((res) => (res.status === 200 ? window.location.reload() : alert('Error on request')));
  };
  
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [buyer, setBuyer] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [num_conv, setNum_conv] = useState('');
  const [date_sign, setDate_sign] = useState('');
  const [type_grav, setType_grav] = useState('');
  const [type_usage, setType_usage] = useState('');
  const [departement, setDepartement] = useState('');
  const [project_manager, setProject_manager] = useState('');
  const [commentary, setCommentary] = useState('');
  const [surface, setSurface] = useState('');
  const [photo, setPhoto] = useState('');
  const [tonnage_CUB, setTonnage_CUB] = useState('');
  const [lot, setLot] = useState('');

  return (
    <div className="ConstructionSiteForm">
      {/* Icone to close popup and refresh page */}
      <Icon
        className="ConstructionSiteForm__icon"
        icon={faWindowClose}
        onClick={() => window.location.reload()}
      />
      <div className="ConstructionSiteForm__header">
        <h1 className="ConstructionSiteForm__header-title">{id ? 'Édition de chantier' : 'Création de chantier'}</h1>
      </div>
      <div className="ConstructionSiteForm__content">
        <form className="ConstructionSiteForm__form" onSubmit={id ? editHandleSubmit : addHandleSubmit}>
          <label htmlFor="name">Nom du chantier</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="state">Etat du chantier</label>
          <input type="text" name="state" id="state" value={state} onChange={(e) => setState(e.target.value)} />
          <label htmlFor="buyer">Demandeur</label>
          <input type="text" name="buyer" id="buyer" value={buyer} onChange={(e) => setBuyer(e.target.value)} />
          <label htmlFor="contact">Contact</label>
          <input type="text" name="contact" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
          <label htmlFor="address">addresse</label>
          <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <label htmlFor="num_conv">Numéro de convention</label>
          <input type="text" name="num_conv" id="num_conv" value={num_conv} onChange={(e) => setNum_conv(e.target.value)} />
          <label htmlFor="date_sign">date de signature</label>
          <input type="text" name="date_sign" id="date_sign" value={date_sign} onChange={(e) => setDate_sign(e.target.value)} />
          <label htmlFor="type_grav">Type grav</label>
          <input type="text" name="type_grav" id="type_grav" value={type_grav} onChange={(e) => setType_grav(e.target.value)} />
          <label htmlFor="type_usage">Type d'usage</label>
          <input type="text" name="type_usage" id="type_usage" value={type_usage} onChange={(e) => setType_usage(e.target.value)} />
          <label htmlFor="departement">Département</label>
          <input type="text" name="departement" id="departement" value={departement} onChange={(e) => setDepartement(e.target.value)} />
          <label htmlFor="project_manager">Maître d'ouvrage</label>
          <input type="text" name="project_manager" id="project_manager" value={project_manager} onChange={(e) => setProject_manager(e.target.value)} />
          <label htmlFor="commentary">Commentaire</label>
          <input type="text" name="commentary" id="commentary" value={commentary} onChange={(e) => setCommentary(e.target.value)} />
          <label htmlFor="surface">Surface</label>
          <input type="text" name="surface" id="surface" value={surface} onChange={(e) => setSurface(e.target.value)} />
          <label htmlFor="photo">Photo</label>
          <input type="text" name="photo" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
          <label htmlFor="tonnage_CUB">Tonnage en mètre cube</label>
          <input type="text" name="tonnage_CUB" id="tonnage_CUB" value={tonnage_CUB} onChange={(e) => setTonnage_CUB(e.target.value)} />
          <label htmlFor="lot">lot</label>
          <input type="text" name="lot" id="lot" value={lot} onChange={(e) => setLot(e.target.value)} />
          <button type="submit">
            Valider
            </button>
        </form>
      </div>
    </div>
  );
}

export default ConstructionSiteForm;
