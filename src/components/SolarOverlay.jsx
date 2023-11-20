import React from "react";
import "../assets/css/SolarOverlay.css";
import { Link } from "react-router-dom";

const SolarOverlay = ({ currentPlanet }) => {
  return (
    <div className="overlay">
      <h4>Planet: {currentPlanet.frontendName}</h4>
      <Link to={`${currentPlanet.djangoName}`}>Land</Link>
    </div>
  );
};

export default SolarOverlay;
