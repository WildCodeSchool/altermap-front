import React, { useState } from 'react';
import './Layers.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup, faTint, faTimes, faBorderNone, faSpinner,
} from '@fortawesome/free-solid-svg-icons';

export default function Layers({
  displayWaterLayer, displayLimitsLayer, waterIsLoading, limitsIsLoading,
}) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  return (
    <div className={popupIsOpen ? 'Layers expand' : 'Layers'}>
      <button type="button" className={popupIsOpen ? 'hidden' : 'Layers__icon'} onClick={() => setPopupIsOpen(true)}>
        <Icon icon={faLayerGroup} className={popupIsOpen ? 'hidden' : 'Layers__icon'} />
      </button>
      <div className={popupIsOpen ? 'Layers__div' : 'hidden'}>
        <button type="button" className={popupIsOpen ? 'Layers__button show' : 'Layers__button'} onClick={displayWaterLayer}>
          <Icon icon={faTint} className={!popupIsOpen ? 'hidden' : 'Layers__icon'} />
        </button>
        <button type="button" className={waterIsLoading ? 'Layers__load' : 'hidden'}>
          <Icon icon={faSpinner} className="PdfExport__icon--loader" />
        </button>
      </div>
      <div className={popupIsOpen ? 'Layers__div' : 'hidden'}>
        <button type="button" className={popupIsOpen ? 'Layers__button show' : 'Layers__button'} onClick={displayLimitsLayer}>
          <Icon icon={faBorderNone} className={!popupIsOpen ? 'hidden' : 'Layers__icon'} />
        </button>
        <button type="button" className={limitsIsLoading ? 'Layers__load' : 'hidden'}>
          <Icon icon={faSpinner} className="PdfExport__icon--loader" />
        </button>
      </div>
      <button type="button" className={popupIsOpen ? 'Layers__button show' : 'Layers__button'} onClick={() => setPopupIsOpen(false)}>
        <Icon icon={faTimes} className={!popupIsOpen ? 'hidden' : 'Layers__icon'} />
      </button>
    </div>
  );
}
