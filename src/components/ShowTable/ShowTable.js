/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import './ShowTable.css';
import axios from 'axios';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faSpinner, faPencilAlt, faTrashAlt, faSearch, faTimes, faCrosshairs,
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
  };

  return (
    <div className={tableIsDisplay ? 'ShowTable' : 'slide-down'}>
      <button type="button" className="Info__close" onClick={() => setTableIsDisplay(false)}>
        <Icon className="Info__icon" icon={faTimes} />
      </button>
      {!isLoading && table
        ? (
          <>
            <table className="ShowTable__table">
              {table.filter((filter) => filter.name.includes(search)).length > 0 ? (
                <tbody>
                  {table.filter((filter) => filter.name.includes(search)).map((cs) => (
                    <div className="ShowTable__table--block">
                      <tr className="ShowTable__table--line" key={`${cs.id} ${cs.name}`}>
                        <td className="ShowTable__line--text">{cs.name}</td>
                        <td className="ShowTable__line--text">{cs.status}</td>
                        <td className="ShowTable__line--text">Géré par <span>{cs.project_manager}</span></td>
                        <td className="ShowTable__line--text">Dans le <span>département {cs.departement}</span> en <span>{cs.year}</span></td>
                        <td className="ShowTable__line--options">
                          <button type="button" className="ShowTable__option--button" onClick={() => goToPoint(cs.coords[0].map((x) => Number(x)))}>
                            <Icon icon={faCrosshairs} className="ShowTable__option--delete" /> Voir
                          </button>
                          <button type="button" className="ShowTable__option--button" onClick={() => setPolygonToUpdate(cs.id)}>
                            <Icon icon={faPencilAlt} className="ShowTable__option--edit" /> Éditer
                          </button>
                          <button type="button" className="ShowTable__option--button" onClick={() => deleteCS(cs.id)}>
                            <Icon icon={faTrashAlt} className="ShowTable__option--delete" /> Supprimer
                          </button>
                        </td>
                      </tr>
                    </div>
                  ))}
                </tbody>
              )
                : (
                  <tbody className="ShowTable--noTable">
                    <tr>
                      <td>Aucun chantier pour le moment !</td>
                    </tr>
                  </tbody>
                )}
            </table>
            <form className="ShowTable__form">
              <input type="text" className="ShowTable__form--input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Chantier du lac" />
              <Icon icon={faSearch} className="ShowTable__input--icon" />
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
  );
}
