import React from "react";
import "../assets/css/SolarOverlay.css";
import { Link } from "react-router-dom";

const SolarOverlay = ({ currentPlanet }) => {
  return (
    <>
      <div className="overlay">
        <h4 className="my-3">Planet: {currentPlanet.frontendName}</h4>

        <Link to={`${currentPlanet.djangoName}`} className="button my-4">
          <div className="button-txt">Land</div>
        </Link>
      </div>
    </>
  );
};

export default SolarOverlay;
