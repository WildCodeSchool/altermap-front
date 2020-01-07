import React from 'react';
import './Info.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Info({ close }) {
  return (
    <div className="Info">
      <Link
        to="/"
        onClick={() => {
          close();
        }}
      >
        <Icon className="Info__icon" icon={faWindowClose} />
      </Link>
      <div className="Info__header">
        <Logo />
        <h1 className="Info__header-title">Altermap</h1>
      </div>
      <div className="Info__content">
        <p>
          Carte des contraintes environnementales liées à l'Arrêté du 18.11.11
          relatif à la valorisation des mâchefers d'incinération en technique
          routière. Voir la notice complète du produit et les clauses générales
          et particulières. Altermap ne peut être tenu responsable de la
          disponibilité et qualité des données sources ni de l’usage fait de la
          carte. Point d’attention : certains critères de l’annexe 4 ne peuvent
          être couverts par la cartographie et nécessitent une analyse de
          terrain (altitudes et pente) et en mairie (documents d’urbanisme). Il
          s’agit de la « distance verticale de 50cm au dessus des plus hautes
          eaux connues », de l’ « altitude du lit du cours d’eau inférieure de
          plus de 20m à celle de la base de l’ouvrage » ainsi que des « zones
          couvertes par servitude d’utilité publique instituée au titre de la
          protection en eau (L211.12) ».
        </p>
        <a
          className="Info__link"
          href="https://www.youtube.com/channel/UCbi5AKrzPtSpDHV73sTcsqQ"
        >
          Lien vers nos tutoriels
        </a>
      </div>
    </div>
  );
}

export default Info;
