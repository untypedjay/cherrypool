import React from 'react';
import './LiquidityCard.css';

interface Props {
  logo1: string,
  logo2: string,
  abbreviation1: string,
  abbreviation2: string,
  apy: number,
  poolValue1: number,
  poolValue2: number,
  poolShare: number
}

function LiquidityCard({ logo1, logo2, abbreviation1, abbreviation2, apy, poolValue1, poolValue2, poolShare }: Props) {
  return (
    <div className="liquidity-card">
      <div className="liquidity-card__pool">
        <img className="liquidity-card__image" src={logo1}/>
        <img className="liquidity-card__image" src={logo2}/>
        <p>{ abbreviation1 }-{ abbreviation2 }</p>
      </div>
      <p className="liquidity-card__apy">{ apy }% APY</p>
      <div className="liquidity-card__detail"><span>Pooled { abbreviation1 }</span><span>{ poolValue1 }</span></div>
      <div className="liquidity-card__detail"><span>Pooled { abbreviation2 }</span><span>{ poolValue2 }</span></div>
      <div className="liquidity-card__detail"><span>Pool share</span><span>{ poolShare }%</span></div>
    </div>
  );
}

export default LiquidityCard;