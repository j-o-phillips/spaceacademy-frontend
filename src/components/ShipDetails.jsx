import React, { useEffect, useState } from "react";
import "../assets/css/ShipDetails.css";

const ShipDetails = () => {
  const [shipDetails, setShipDetails] = useState("");

  useEffect(() => {
    const getShipDetails = async () => {
      const auth_token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/game/ship/`,
        {
          headers: {
            Authorization: "Token " + auth_token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error in the response");
      }

      const result = await response.json();
      setShipDetails(result);
      console.log(result);
      console.log(shipDetails);
    };

    getShipDetails();
  }, []);

  const handleUpgrade = (equipment) => {
    console.log(equipment);
  };
  return (
    <div className="ship-details">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Power</th>
            <th scope="col">Level</th>
            <th scope="col">Upgrade</th>
          </tr>
        </thead>
        <tbody>
          {shipDetails && (
            <>
              <tr>
                <th scope="row">Engines:</th>
                <td>{shipDetails.engines.name}</td>
                <td>{shipDetails.engines.speed}</td>
                <td>{shipDetails.engines.level}</td>
                <td>
                  <button
                    className="upgrade-button"
                    onClick={(e) => {
                      console.log(e.target);
                      handleUpgrade("engines");
                    }}
                  >
                    <div>Cost: 100</div>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">Thrusters:</th>
                <td>{shipDetails.thrusters.name}</td>
                <td>{shipDetails.thrusters.thrust}</td>
                <td>{shipDetails.thrusters.level}</td>
                <td>
                  <button
                    className="upgrade-button"
                    onClick={(e) => {
                      console.log(e.target);
                      handleUpgrade("thrusters");
                    }}
                  >
                    <div>Cost: 100</div>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">Weapons:</th>
                <td>{shipDetails.weapons.name}</td>
                <td>{shipDetails.weapons.damage}</td>
                <td>{shipDetails.weapons.level}</td>
                <td>
                  <button
                    className="upgrade-button"
                    onClick={(e) => {
                      console.log(e.target);
                      handleUpgrade("weapons");
                    }}
                  >
                    <div>Cost: 100</div>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">Shields:</th>
                <td>{shipDetails.shields.name}</td>
                <td>{shipDetails.shields.power}</td>
                <td>{shipDetails.shields.level}</td>
                <td>
                  <button
                    className="upgrade-button"
                    onClick={(e) => {
                      console.log(e.target);
                      handleUpgrade("shields");
                    }}
                  >
                    <div>Cost: 100</div>
                  </button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShipDetails;
