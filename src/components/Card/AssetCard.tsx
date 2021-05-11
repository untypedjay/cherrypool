import React from 'react';
import './AssetCard.css';
import {round} from '../../helper/converter';

interface Props {
  icon?: string,
  abbreviation: string,
  name: string,
  balance: number
}

function AssetCard({ icon, abbreviation, name, balance }: Props) {
  return (
    <div className="asset-card">
      <div className="asset-card__container">
        { icon ?
          <img className="asset-card__icon" src={icon} alt="Asset Icon"/> :
          <div className="asset-card__icon--alt"><p>{ abbreviation.charAt(0) }</p></div>
        }
        <div className="asset-card__name-container">
          <p className="asset-card__text--bold">{ abbreviation }</p>
          <p className="asset-card__name">{ name }</p>
        </div>
      </div>
      <p><span className="asset-card__text--bold">{ round(balance, 8) }</span> <span>{ abbreviation }</span></p>
    </div>
  );
}

export default AssetCard;