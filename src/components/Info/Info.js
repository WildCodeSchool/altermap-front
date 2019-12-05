import React from 'react';
import './Info.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Info() {
  return (
    <div className="Info">
      <Link to="/"><Icon icon={faWindowClose} /></Link>
      <Logo />
      <h1>Altermap</h1>
      <h2>Titre</h2>
      <p>
            Outil de démonstration de la traçabilité environnementale - PYRENEES ORIENTALES (66)
      </p>
      <h2>
        Description
      </h2>
      <p>
        Carte des contraintes environnementales liées à l'Arrêté du 18.11.11 relatif à la valorisation des mâchefers d'incinération en technique routière. Voir la notice complète du produit et les clauses générales et particulières.
        Altermap ne peut être tenu responsable de la disponibilité et qualité des données sources ni de l’usage fait de la carte.
        Point d’attention : certains critères de l’annexe 4 ne peuvent être couverts par la cartographie et nécessitent une analyse de terrain (altitudes et pente) et en mairie (documents d’urbanisme). Il s’agit de la « distance verticale de 50cm au dessus des plus hautes eaux connues », de l’ « altitude du lit du cours d’eau inférieure de plus de 20m à celle de la base de l’ouvrage » ainsi que des « zones couvertes par servitude d’utilité publique instituée au titre de la protection en eau (L211.12) ».
      </p>
      <a href="https://www.youtube.com/channel/UCbi5AKrzPtSpDHV73sTcsqQ">
        Lien vers nos tutoriels
      </a>

      <h2>Structure</h2>
      <p>Altermap</p>

      <h2>Personne</h2>
      <p>François Lavessiere</p>

      <h2>Courriel</h2>
      <p>contact@altermap.fr</p>

      <h2>Téléphone</h2>
      <p>06 63 49 89 87</p>

      <h2>Site internet</h2>
      <p>
        <a href="http://www.altermap.fr">http://www.altermap.fr</a>
      </p>

      <h2>Projection</h2>
      <p>EPSG:3857</p>

      <h2>Emprise</h2>
      <p>
        -1048450.57955238735303283,
        5175328.64542050752788782,
        1392563.06167592853307724,
        6672702.11393237393349409

      </p>


    </div>
  );
}

export default Info;
