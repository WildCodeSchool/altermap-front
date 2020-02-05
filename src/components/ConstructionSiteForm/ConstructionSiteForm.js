import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './ConstructionSiteForm.css';

function ConstructionSiteForm({
  id, constructionSite, coords, refreshCoords,
}) {
  const stateConstruction = ['Prospection', 'En cours', 'Annulé', 'Terminé'];
  const typeUsageList = ['V1', 'V2', 'V1 et V2', 'Autre'];
  const yearsList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
  const typeGraveList = ['Machefer', 'Autre'];
  const [name, setName] = useState(constructionSite ? constructionSite.name : '');
  const [status, setStatus] = useState(constructionSite ? constructionSite.status : 1);
  const [year, setYear] = useState(constructionSite ? constructionSite.year : 1);
  const [buyer, setBuyer] = useState(constructionSite ? constructionSite.buyer : '');
  const [contact, setContact] = useState(constructionSite ? constructionSite.contact : '');
  const [num_conv, setNumConv] = useState(constructionSite ? constructionSite.num_conv : 0);
  const [date_sign, setDateSign] = useState(constructionSite ? constructionSite.date_sign : 0);
  const [type_grave, setTypeGrave] = useState(constructionSite ? constructionSite.type_grave : 1);
  const [type_usage, setTypeUsage] = useState(constructionSite ? constructionSite.type_usage : 1);
  const [departement, setDepartement] = useState(constructionSite ? constructionSite.departement : 0);
  const [project_manager, setProjectManager] = useState(constructionSite ? constructionSite.project_manager : '');
  const [commentary, setCommentary] = useState(constructionSite ? constructionSite.commentary : '');
  const [area, setArea] = useState(constructionSite ? constructionSite.area : 0);
  const [photo, setPhoto] = useState(constructionSite ? constructionSite.photo : '');
  const [lots, setLots] = useState(constructionSite ? constructionSite.lots : 0);
  const [tonnage, setTonnage] = useState(constructionSite ? constructionSite.tonnage : 0);
  const [isCompleted, setIsCompleted] = useState('')
  const [precPage, setPrecPage] = useState(1)

  const [page, setPage] = useState(0);
  const redirectField = () => {
    if (buyer === '' || name === '' || year === 1 || status === 1) {
      setPage(0);
      setIsCompleted('show')
      setTimeout(() => setIsCompleted(''), 3000);
    } else if (contact === '' || num_conv === 0 || date_sign === 0 || type_grave === 1) {
      setPage(1);
      setIsCompleted('show')
      setTimeout(() => setIsCompleted(''), 3000);
    } else if (type_usage === 1 || departement === 0 || project_manager === '' || commentary === '') {
      setPage(2);
      setIsCompleted('show')
      setTimeout(() => setIsCompleted(''), 3000);
    } else {
      setPage(3);
      setIsCompleted('show')
      setTimeout(() => setIsCompleted(''), 3000);
    }
  };

  const addHandleSubmit = (e) => {
    redirectField();
    e.preventDefault();
    axios.post('/api/v1/construction-sites', {
      name, coords: coords, status, buyer, contact, num_conv, date_sign, type_grave, year, type_usage, departement, project_manager, commentary, area, photo, lots, tonnage,
    })
      .then((res) => {
        if (res.status === 200) {
          refreshCoords(null);
          window.location.reload();
        } else {
          alert('Error on request');
        }
      });
  };

  const editHandleSubmit = (event) => {
    redirectField();
    event.preventDefault();
    axios.put(`/api/v1/construction-sites/${id}`, {
      name, coords: coords || constructionSite.coords, status, buyer, contact, num_conv, date_sign, type_grave, year, type_usage, departement, project_manager, commentary, area, photo, lots, tonnage,
    })
      .then((res) => (res.status === 200 ? window.location.reload() : alert('Error on request')));
  };

  const nextPage = () => {
    setPage(page + 1);
    if (precPage === page) {
      setIsCompleted('')
      setPrecPage(page - 1)
    } else {
      !constructionSite && redirectField()
    }
  };

  const prevPage = () => {
    setIsCompleted('')
    setPage(page - 1);
  };

  const allFields = () => {
    if (
      buyer !== ''
      && name !== ''
      && year !== 1
      && status !== 1
      && contact !== ''
      && num_conv !== 0
      && date_sign !== 0
      && type_grave !== 1
      && type_usage !== 1
      && departement !== 0
      && project_manager !== ''
      && commentary !== ''
      && area !== 0
      && lots !== 0
      && tonnage !== 0
      && photo !== ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="ConstructionSiteForm">

      <div className="ConstructionSiteForm__icon__div--Container">
        <span className="ConstructionSiteForm__icon--Container">
          <Icon
            className="ConstructionSiteForm__icon"
            icon={faTimes}
            onClick={() => window.location.reload()}
          />
        </span>
        <div className="ConstructionSiteForm__header">
          <h1 className="ConstructionSiteForm__header-title">{id ? 'Édition de chantier' : 'Création de chantier'}</h1>
        </div>
      </div>

      <div className="ConstructionSiteForm__content">
        <form className="ConstructionSiteForm__form" onSubmit={id ? editHandleSubmit : addHandleSubmit} onChange={allFields}>
          <div className={page === 0 ? 'ConstructionSiteForm__page--active' : 'ConstructionSiteForm__page--inactive'}>
            <label className="ConstructionSiteForm__label" htmlFor="name">
              <span>Nom du chantier</span>
              <input type="text" name="name" id="name" value={name} required className="ConstructionSiteForm__input" placeholder="Autoroute A6" onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="status">
              <span>Status</span>
              <select className={status === 1 ? 'ConstructionSiteForm__select' : 'ConstructionSiteForm__select--value'} required type="text" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="1" disabled>Sélectionnez une valeur</option>
                {stateConstruction.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="year">
              <span>Année des travaux</span>
              <select className={year === 1 ? 'ConstructionSiteForm__select' : 'ConstructionSiteForm__select--value'} required type="text" name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="1" disabled>Année</option>
                {yearsList.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="buyer">
              <span>Demandeur</span>
              <input className="ConstructionSiteForm__input" type="text" name="buyer" id="buyer" placeholder="EDF" required value={buyer} onChange={(e) => setBuyer(e.target.value)} />
            </label>
            <div className="ConstructionSiteForm__arrowContainer">
              <span>1/4</span>
              <button onClick={() => nextPage()} className="ConstructionSiteForm__arrowSizeNext">
                Suivant
                <Icon icon={faCaretRight} className="carret-right" ></Icon>
              </button>
            </div>
          </div>

          <div className={page === 1 ? 'ConstructionSiteForm__page--active' : 'ConstructionSiteForm__page--inactive'}>
            <label htmlFor="contact">
              <span>Contact</span>
              <input className="ConstructionSiteForm__input" placeholder="M. Thomas" type="text" name="contact" required id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="numConv">
              <span>Numéro de convention</span>
              <input className="ConstructionSiteForm__input" placeholder="21" type="number" name="num_conv" required id="numConv" value={num_conv} onChange={(e) => setNumConv(e.target.value)} />
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="dateSign">
              <span>Date de signature</span>
              <input className="ConstructionSiteForm__input" placeholder="1964" type="number" name="date_sign" required id="dateSign" value={date_sign} onChange={(e) => setDateSign(e.target.value)} />
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="typeGrave">
              <span>Type de grave</span>
              <select className={type_grave === 1 ? 'ConstructionSiteForm__select' : 'ConstructionSiteForm__select--value'} required type="text" name="type_grave" id="typeGrave" value={type_grave} onChange={(e) => setTypeGrave(e.target.value)}>
                <option value="1" disabled>Type grave</option>
                {typeGraveList.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </label>
            <div className="ConstructionSiteForm__arrowContainer">
              <button onClick={() => prevPage()} className="ConstructionSiteForm__arrowSizePrev">
                <Icon icon={faCaretLeft} />
                Précédent
              </button>
              <span>2/4</span>
              <button onClick={() => nextPage()} className="ConstructionSiteForm__arrowSizeNext">
                Suivant
                  <Icon icon={faCaretRight} />
              </button>
            </div>
          </div>

          <div className={page === 2 ? 'ConstructionSiteForm__page--active' : 'ConstructionSiteForm__page--inactive'}>
            <label className="ConstructionSiteForm__label" htmlFor="typeUsage">
              <span>Type d'usage</span>
              <select className={type_usage === 1 ? 'ConstructionSiteForm__select' : 'ConstructionSiteForm__select--value'} required type="text" name="type_usage" id="typeUsage" value={type_usage} onChange={(e) => setTypeUsage(e.target.value)}>
                <option value="1" disabled>Sélectionnez une valeur</option>
                {typeUsageList.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="departement">
              <span>Département</span>
              <input className="ConstructionSiteForm__input" placeholder="66" type="number" name="departement" id="departement" required value={departement} onChange={(e) => setDepartement(e.target.value)} />
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="projectManager">
              <span>Maître d'ouvrage</span>
              <input className="ConstructionSiteForm__input" placeholder="M.Thomas" type="text" name="project_manager" required id="projectManager" value={project_manager} onChange={(e) => setProjectManager(e.target.value)} />
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="commentary">
              <span>Commentaires</span>
              <input className="ConstructionSiteForm__input" placeholder="En collaboration avec GRDF" type="text" name="commentary" required id="commentary" value={commentary} onChange={(e) => setCommentary(e.target.value)} />
            </label>
            <div className="ConstructionSiteForm__arrowContainer">
              <button onClick={() => prevPage()} className="ConstructionSiteForm__arrowSizePrev">
                <Icon icon={faCaretLeft} />
                Précédent
              </button>
              <span>
                3/4
                </span>
              <button onClick={() => nextPage()} className="ConstructionSiteForm__arrowSizeNext">
                Suivant
                  <Icon icon={faCaretRight} />
              </button>
            </div>
          </div>

          <div className={page === 3 ? 'ConstructionSiteForm__page--active' : 'ConstructionSiteForm__page--inactive'}>
            <label className="ConstructionSiteForm__label" htmlFor="area">
              <span>Surface</span>
              <input className="ConstructionSiteForm__input" placeholder="2.3" type="number" name="area" id="area" required value={area} onChange={(e) => setArea(e.target.value)} />
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="photo">
              <span>Photo</span>
              <input className="ConstructionSiteForm__input" placeholder="http://google.fr" type="text" name="photo" required id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="lot">
              <span>lot</span>
              <input className="ConstructionSiteForm__input" placeholder="2" type="number" name="lots" id="lot" required value={lots} onChange={(e) => setLots(e.target.value)} />
            </label>
            <label className="ConstructionSiteForm__label" htmlFor="tonnage">
              <span>Tonnage</span>
              <input className="ConstructionSiteForm__input" placeholder="2" type="number" name="tonnage" required id="tonnage" value={tonnage} onChange={(e) => setTonnage(e.target.value)} />
            </label>
            <div className="ConstructionSiteForm__arrowContainer">
              <button onClick={() => prevPage()} className="ConstructionSiteForm__arrowSizePrev">
                <Icon icon={faCaretLeft} />
                Précédent
              </button>
              <span>4/4</span>
            </div>
            <button className={allFields() ? "ConstructionSiteForm__submit" : "ConstructionSiteForm__submit disable"} disabled={allFields() ? false : true} type="submit">
              Valider
            </button>
          </div>
        </form>
        <div id="ConstructionSiteForm__snackbar" className={isCompleted}>
          <span>Remplissez tous les champs</span>
        </div>
      </div>
    </div >
  );
}

export default ConstructionSiteForm;
