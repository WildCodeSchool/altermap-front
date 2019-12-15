import React from "react";
import "./ConstructionSiteForm.css";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ConstructionSiteForm({ close }) {
  const handleSubmit = event => {
    event.preventDefault();
    // axios.post("/api/v1/construction-sites");
  };
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
          <label htmlFor="constructionName">Nom du chantier</label>
          <input type="text" name="constructionName" id="constructionName" />
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConstructionSiteForm;
