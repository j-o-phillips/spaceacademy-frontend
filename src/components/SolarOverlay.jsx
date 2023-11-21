import React from "react";
import "../assets/css/SolarOverlay.css";
import { Link } from "react-router-dom";

const SolarOverlay = ({ currentPlanet }) => {
  return (
    <div className="overlay">
      <h4 className="my-3">Planet: {currentPlanet.frontendName}</h4>
      <p>Cards discovered: Unknown </p>
      <p>Cards left to discover: Unknown </p>
      <Link to={`${currentPlanet.djangoName}`} className="link my-4">
        <div className="nav-txt">Land</div>
      </Link>
    </div>
  );
};

export default SolarOverlay;
