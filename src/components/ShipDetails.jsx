import React, { useEffect, useState } from "react";
import "../assets/css/ShipDetails.css";
import { useProfileContext } from "../context/ProfileContext";
import { getUserProfileFunc } from "../controllers/userProfile";

const ShipDetails = () => {
  const [shipDetails, setShipDetails] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [count, setCount] = useState(0);
  const { profileData, setProfileData } = useProfileContext();

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
    };

    getShipDetails();
  }, [count]);

  const handleUpgrade = async (equipment, price) => {
    //check if enough credits
    if (profileData.profile.credits < price) {
      setMessageCount(1);
      return;
    } else {
      const auth_token = localStorage.getItem("auth_token");
      const data = {
        price: price,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/game/ship/${equipment}/`,
        {
          method: "POST",
          headers: {
            Authorization: "Token " + auth_token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("An error in the response");
      }

      const result = await response.json();
      if (result.message === `${equipment} upgraded`) {
        setCount((prev) => prev + 1);
        setMessageCount(2);
        const profile = await getUserProfileFunc(auth_token);
        setProfileData(profile);
      } else {
        console.log("error");
      }
    }
  };
  return (
    <div className="ship-details mx-3">
      {shipDetails && (
        <>
          <h2 className="text-white my-3">Ship: {shipDetails.ship.name}</h2>
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
              <tr>
                <th scope="row">Engines:</th>
                <td>{shipDetails.engines.name}</td>
                <td>{shipDetails.engines.speed}</td>
                <td>{shipDetails.engines.level}</td>
                <td>
                  <button
                    className="button p-0"
                    onClick={(e) => {
                      console.log(e.target);
                      handleUpgrade("engines", shipDetails.engines.price);
                    }}
                  >
                    <div className="button-txt">
                      Cost: {shipDetails.engines.price}
                    </div>
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
                    className="button p-0"
                    onClick={(e) => {
                      console.log(e.target);
                      handleUpgrade("thrusters", shipDetails.thrusters.price);
                    }}
                  >
                    <div className="button-txt">
                      {" "}
                      Cost: {shipDetails.thrusters.price}
                    </div>
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
                    className="button p-0"
                    onClick={(e) => {
                      console.log(e.target);
                      handleUpgrade("weapons", shipDetails.weapons.price);
                    }}
                  >
                    <div className="button-txt">
                      {" "}
                      Cost: {shipDetails.weapons.price}
                    </div>
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
                    className="button p-0"
                    onClick={(e) => {
                      console.log(e.target);
                      handleUpgrade("shields", shipDetails.shields.price);
                    }}
                  >
                    <div className="button-txt">
                      {" "}
                      Cost: {shipDetails.shields.price}
                    </div>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {messageCount === 1 && (
            <div className="alert d-flex flex-column align-items-center justify-content-around">
              <h4>Not enough credits</h4>
              <button className="button" onClick={() => setMessageCount(0)}>
                <div className="button-txt">Close</div>
              </button>
            </div>
          )}
          {messageCount === 2 && (
            <div className="alert d-flex flex-column align-items-center justify-content-around">
              <h4>Equipment upgraded</h4>
              <button className="button" onClick={() => setMessageCount(0)}>
                <div className="button-txt">Close</div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShipDetails;
