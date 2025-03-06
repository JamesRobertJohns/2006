import * as React from 'react';
import './InfoCard.css';
import house from '../assets/house.png';

export default function InfoCard() {
  return (
    <div className="card">
      <img
        src= {house}
        alt="house"
        className="media"
      />
      <div className="content">
        <div className="title">Placeholder</div>
        <div className="description">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica.
        </div>
      </div>
      <div className="actions">
        <button className="button">Share</button>
        <button className="button">Learn More</button>
      </div>
    </div>
  );
}