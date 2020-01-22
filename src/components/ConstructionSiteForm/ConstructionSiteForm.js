import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './ConstructionSiteForm.css';
import { Redirect } from 'react-router-dom';

function ConstructionSiteForm({ id, coords, incomingData }) {
  const stateConstruction = ['Prospection', 'En cours', 'Annulé', 'Terminé'];
  const typeUsageList = ['V1', 'V2', 'V1 et V2', 'Autre'];
  const yearsList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
  const typeGraveList = ['Machefer', 'Autre'];
  const [name, setName] = useState(incomingData ? incomingData.name : '');
  const [status, setStatus] = useState(incomingData ? incomingData.status : 1);
  const [year, setYear] = useState(incomingData ? incomingData.year : 1);
  const [buyer, setBuyer] = useState(incomingData ? incomingData.buyer : '');
  const [contact, setContact] = useState(incomingData ? incomingData.contact : '');
  const [num_conv, setNumConv] = useState(incomingData ? incomingData.num_conv : '');
  const [date_sign, setDateSign] = useState(incomingData ? incomingData.date_sign : '');
  const [type_grave, setTypeGrave] = useState(incomingData ? incomingData.type_grave : 1);
  const [type_usage, setTypeUsage] = useState(incomingData ? incomingData.type_usage : 1);
  const [departement, setDepartement] = useState(incomingData ? incomingData.departement : '');
  const [project_manager, setProjectManager] = useState(incomingData ? incomingData.project_manager : '');
  const [commentary, setCommentary] = useState(incomingData ? incomingData.commentary : '');
  const [area, setArea] = useState(incomingData ? incomingData.area : '');
  const [photo, setPhoto] = useState(incomingData ? incomingData.photo : '');
  const [lots, setLots] = useState(incomingData ? incomingData.lots : '');
  const [tonnage, setTonnage] = useState(incomingData ? incomingData.tonnage : '');
  const [page, setPage] = useState(0)
  const redirectField = () => {
    if (buyer === "" || name === "" || year === 1 || status === 1) {
      setPage(0);
    } else if (contact === "" || num_conv === "" || date_sign === "" || type_grave === 1) {
      setPage(1)
    } else if (type_usage === 1 || departement === "" || project_manager === "" || commentary === "") {
      setPage(2)
    } else {
      setPage(3)
    }
  }
  const addHandleSubmit = (e) => {
    redirectField()
    e.preventDefault();

    axios.post('/api/v1/construction-sites', {
      name, coords, status, buyer, contact, num_conv, date_sign, type_grave, year, type_usage, departement, project_manager, commentary, area, photo, lots, tonnage,
    })
      // Refresh de la page si l'envoie à fonctionné
      .then((res) => (res.status === 200 ? window.location.reload() : alert('Error on request')));
  };

  const editHandleSubmit = (event) => {
    // Evite un refresh dont on a pas besoin et permet d'éxécuter les requêtes
    redirectField()
    event.preventDefault();
    axios.put(`/api/v1/construction-sites/${id}`, {
      name, coords, status, buyer, contact, num_conv, date_sign, type_grave, year, type_usage, departement, project_manager, commentary, area, photo, lots, tonnage,
    })
      // Refresh page if request is OK
      .then((res) => (res.status === 200 ? window.location.reload() : alert('Error on request')));
  };
  const nextPage = () => {

    setPage(page + 1)
    redirectField()
  }

  const prevPage = () => {

    setPage(page - 1)
  }
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
          <div className={page === 0 ? "ConstructionSiteForm__page--active" : "ConstructionSiteForm__page--inactive"}>
            <label className="has-float-label" htmlFor="name">
              <input type="text" name="name" id="name" value={name} required className="ConstructionSiteForm__input" placeholder="Autoroute A6" onChange={(e) => setName(e.target.value)} required />
              <span>Nom du chantier</span>
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="status">
              <select className={status === 1 ? "ConstructionSiteForm__select" : "ConstructionSiteForm__select--value"} required type="text" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="1" disabled>Etat du chantier</option>
                {stateConstruction.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="year">
              <select className={year === 1 ? "ConstructionSiteForm__select" : "ConstructionSiteForm__select--value"} required type="text" name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="1" disabled>Année</option>
                {yearsList.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </label>
            <label className="has-float-label" htmlFor="buyer">
              <input className="ConstructionSiteForm__input" type="text" name="buyer" id="buyer" placeholder="EDF" required value={buyer} onChange={(e) => setBuyer(e.target.value)} />
              <span>Demandeur</span>
            </label>
            <button type="button" onClick={() => nextPage()}>+</button>
          </div>

          <div className={page === 1 ? "ConstructionSiteForm__page--active" : "ConstructionSiteForm__page--inactive"}>

            <label className="has-float-label" htmlFor="contact">
              <input className="ConstructionSiteForm__input" placeholder="M. Thomas" type="text" name="contact" required id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
              <span>Contact</span>
            </label>
            <label className="has-float-label" htmlFor="numConv">
              <input className="ConstructionSiteForm__input" placeholder="21" type="text" name="num_conv" required id="numConv" value={num_conv} onChange={(e) => setNumConv(e.target.value)} />
              <span> Numéro de convention </span>
            </label>
            <label className="has-float-label" htmlFor="dateSign">
              <input className="ConstructionSiteForm__input" placeholder="1964" type="text" name="date_sign" required id="dateSign" value={date_sign} onChange={(e) => setDateSign(e.target.value)} />
              <span> date de signature </span>
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="typeGrave">
              <select className={type_grave === 1 ? "ConstructionSiteForm__select" : "ConstructionSiteForm__select--value"} required type="text" name="type_grave" id="typeGrave" value={type_grave} onChange={(e) => setTypeGrave(e.target.value)}>
                <option value="1" disabled>Type grave</option>
                {typeGraveList.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={() => prevPage()}>-</button>
            <button type="button" onClick={() => nextPage()}>+</button>
          </div>
          <div className={page === 2 ? "ConstructionSiteForm__page--active" : "ConstructionSiteForm__page--inactive"}>

            <label className="ConstructionSiteForm__label" htmlFor="typeUsage">
              <select className={type_usage === 1 ? "ConstructionSiteForm__select" : "ConstructionSiteForm__select--value"} required type="text" name="type_usage" id="typeUsage" value={type_usage} onChange={(e) => setTypeUsage(e.target.value)}>
                <option value="1" disabled>Type d'usage</option>
                {typeUsageList.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </label>
            <label className="has-float-label" htmlFor="departement">
              <input className="ConstructionSiteForm__input" placeholder="66" type="text" name="departement" id="departement" required value={departement} onChange={(e) => setDepartement(e.target.value)} />
              <span> Département</span>
            </label>
            <label className="has-float-label" htmlFor="projectManager">
              <input className="ConstructionSiteForm__input" placeholder="M.Thomas" type="text" name="project_manager" required id="projectManager" value={project_manager} onChange={(e) => setProjectManager(e.target.value)} />
              <span>Maître d'ouvrage</span>
            </label>
            <label className="has-float-label" htmlFor="commentary">
              <input className="ConstructionSiteForm__input" placeholder="l'espace ..." type="text" name="commentary" required id="commentary" value={commentary} onChange={(e) => setCommentary(e.target.value)} />
              <span>Commentaires</span>
            </label>
            <button type="button" onClick={() => prevPage()}>-</button>
            <button type="button" onClick={() => nextPage()}>+</button>
          </div>
          <div className={page === 3 ? "ConstructionSiteForm__page--active" : "ConstructionSiteForm__page--inactive"}>

            <label className="has-float-label" htmlFor="area">
              <input className="ConstructionSiteForm__input" placeholder="2.3" type="text" name="area" id="area" required value={area} onChange={(e) => setArea(e.target.value)} />
              <span>Surface</span>
            </label>
            <label className="has-float-label" htmlFor="photo">
              <input className="ConstructionSiteForm__input" placeholder="http://google.fr" type="text" name="photo" required id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
              <span>Photo</span>
            </label>
            <label className="has-float-label" htmlFor="lot">
              <input className="ConstructionSiteForm__input" placeholder="2" type="text" name="lots" id="lot" required value={lots} onChange={(e) => setLots(e.target.value)} />
              <span>lot</span>
            </label>
            <label className="has-float-label" htmlFor="tonnage">
              <input className="ConstructionSiteForm__input" placeholder="2" type="text" name="tonnage" required id="tonnage" value={tonnage} onChange={(e) => setTonnage(e.target.value)} />
              <span>Tonnage</span>
            </label>
            <button type="button" onClick={() => prevPage()}>-</button>
            <button className="ConstructionSiteForm__submit" type="submit">
              Valider
            </button>

          </div>
        </form>
      </div>
    </div >
  );
}

export default ConstructionSiteForm;
