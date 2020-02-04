/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import './ShowTable.css';
import axios from 'axios';
import download from 'downloadjs';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faSpinner, faPencilAlt, faTrashAlt, faSearch, faCrosshairs, faDownload
} from '@fortawesome/free-solid-svg-icons';
import Popup from '../Popup/Popup';

export default function ShowTable({
  setPopupStatus, popup, setPolygonToUpdate, tableIsDisplay, setTableIsDisplay, setZoom, setPosition,
}) {
  const [table, setTable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [search, setSearch] = useState('');
  useEffect(() => {
    setIsLoading(true);
    const fetchTable = async () => {
      await axios.get('/api/v1/construction-sites/')
        .then((res) => {
          setTable(res.data);
        });
    };
    fetchTable();
    setIsLoading(false);
  }, []);

  const deleteCS = (id) => {
    setIdToDelete(id);
    setPopupStatus(true);
  };

  const goToPoint = (coords) => {
    setPosition(coords.reverse());
    setZoom(17);
    setTableIsDisplay(false)
  };

  const exportConstructionSites = () => {
    axios.get('/api/v1/construction-sites/export')
      .then(response => {
        download(response.data, `export-chantier.csv`, 'application/csv');
      })
  }

  const setPellet = (status) => {
    if (status === "En cours") {
      return 'images/icons/green-pellet.svg';
    }
    if (status === "Prospection") {
      return 'images/icons/green-circle-pellet.svg';
    }
    if (status === "Terminé") {
      return 'images/icons/black-pellet.svg';
    }
    if (status === "Annulé") {
      return 'images/icons/red-pellet.svg';
    }
  }

  return (
    <div className={tableIsDisplay ? 'ShowTable' : 'slide-down'}>
      <div className="ShowTable__relative">
        {!isLoading && table
          ? (
            <>
              <button type="button" className={table.length > 0 ? "ShowTable__export" : "hidden"} onClick={exportConstructionSites}>
                Exporter les chantiers (.csv) <Icon icon={faDownload} className="ShowTable__export-icon" />
              </button>
              <div className="ShowTable__table">
                {table.filter((filter) => filter.name.includes(search)).length > 0 ? (
                  <div>
                    {table.filter((filter) => filter.name.includes(search)).map((cs) => (
                      <div className="ShowTable__table--block" key={`${cs.id} ${cs.name}`}>
                        <div className="ShowTable__table--line">
                          <div>
                            <span className="ShowTable__line--text"><h3 className="ShowTable__line--text--title">{cs.name}</h3></span>
                            <span className="ShowTable__line--text"><img className="pellet-status" src={setPellet(cs.status)} alt="pellet for status" />{cs.status}</span>
                            <span className="ShowTable__line--text">Géré par <span className="ShowTable__line--text--important">{cs.project_manager}</span></span>
                            <span className="ShowTable__line--text">Dans le <span className="ShowTable__line--text--important">département {cs.departement}</span> en <span className="ShowTable__line--text--important">{cs.year.substring(0, 4)}</span></span>
                          </div>
                          <span className="ShowTable__line--options">
                            <button type="button" className="ShowTable__option--button" onClick={() => goToPoint(cs.coords[0].map((x) => Number(x)))}>
                              <Icon icon={faCrosshairs} className="ShowTable__option--delete" /> Voir
                            </button>
                            <button type="button" className="ShowTable__option--button" onClick={() => setPolygonToUpdate(cs.id)}>
                              <Icon icon={faPencilAlt} className="ShowTable__option--edit" /> Éditer
                            </button>
                            <button type="button" className="ShowTable__option--button--delete" onClick={() => deleteCS(cs.id)}>
                              <Icon icon={faTrashAlt} className="ShowTable__option--delete" /> Supprimer
                            </button>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
                  : (
                    <div className="ShowTable--noTable">
                      <p>Aucun chantier pour le moment</p>
                    </div>
                  )}
              </div>
              <form className="ShowTable__form">
                <input type="text" className="ShowTable__form--input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une référence" />
                <div className="ShowTable__input--icon">
                  <Icon icon={faSearch} />
                </div>
              </form>
            </>
          )
          : <Icon icon={faSpinner} className="ShowTable__icon--loader" />}
        {
          popup && idToDelete && (
            <Popup setPopupStatus={setPopupStatus} idToDelete={idToDelete} setIdToDelete={setIdToDelete} />
          )
        }
      </div>
    </div>
  );
}
