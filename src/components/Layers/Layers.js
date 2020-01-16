import React, { useState } from 'react';
import './Layers.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup, faTint, faTimes, faBorderStyle,
} from '@fortawesome/free-solid-svg-icons';

export default function Layers({ displayWaterLayer, displayLimitsLayer }) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  return (
    <div className={popupIsOpen ? 'Layers expand' : 'Layers'}>
      <button type="button" className={popupIsOpen ? 'hidden' : 'Layers__icon'} onClick={() => setPopupIsOpen(true)}>
        <Icon icon={faLayerGroup} className={popupIsOpen ? 'hidden' : 'Layers__icon'} />
      </button>
      <button type="button" className={popupIsOpen ? 'Layers__button show' : 'Layers__button'} onClick={displayWaterLayer}>
        <Icon icon={faTint} className={!popupIsOpen ? 'hidden' : 'Layers__icon'} />
      </button>
      <button type="button" className={popupIsOpen ? 'Layers__button show' : 'Layers__button'} onClick={displayLimitsLayer}>
        <Icon icon={faBorderStyle} className={!popupIsOpen ? 'hidden' : 'Layers__icon'} />
      </button>
      <button type="button" className={popupIsOpen ? 'Layers__button show' : 'Layers__button'} onClick={() => setPopupIsOpen(false)}>
        <Icon icon={faTimes} className={!popupIsOpen ? 'hidden' : 'Layers__icon'} />
      </button>
    </div>
  );
}
