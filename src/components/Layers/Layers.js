import React from 'react';
import './Layers.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

export default function Layers({ displayLayer }) {
  return (
    <button type="button" className="Layers" onClick={displayLayer}>
      <Icon icon={faLayerGroup} className="Layers__icon" />
    </button>
  );
}
