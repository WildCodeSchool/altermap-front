import React, { useState } from 'react';
import './ConstructionSiteForm.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConstructionSiteForm({ close, coords }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/v1/construction-sites", { name, coords })
  };

  const [name, setName] = useState('');
  return (
    <div className="ConstructionSiteForm">
      <Icon
        className="ConstructionSiteForm__icon"
        icon={faWindowClose}
        onClick={() => window.location.reload()}
      />
      <div className="ConstructionSiteForm__header">
        <h1 className="ConstructionSiteForm__header-title">Édition chantier</h1>
      </div>
      <div className="ConstructionSiteForm__content">
        <form className="ConstructionSiteForm__form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nom du chantier</label>
          <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConstructionSiteForm;
