import React from "react";
import "../assets/css/PlanetNav.css";
import { Link } from "react-router-dom";

const PlanetNav = ({ planetName }) => {
  return (
    <div className="planetnav-container">
      <h3>{planetName}</h3>
      <div className="categories">
        <Link to={`/learn/${planetName}/kingsandqueens`}>
          English Kings and Queens
        </Link>
        <Link>Another History Cat</Link>
        <Link>Another History Cat</Link>
        <Link>Another History Cat</Link>
      </div>
    </div>
  );
};

export default PlanetNav;
