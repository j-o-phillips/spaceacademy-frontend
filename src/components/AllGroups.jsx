import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";

const AllGroups = ({ setHangarMembers, setCurrentHangarId }) => {
  const [hangars, setHangars] = useState([]);
  const [newHangarName, setNewHangarName] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    const getHangars = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/game/hangars/`,
        {
          headers: {
            Authorization: "Token " + auth_token,
          },
        }
      );
      if (!response.ok) {
        return new Error("An error in the response");
      }

      const result = await response.json();
      console.log(result.data);
      setHangars(result.data);
    };

    getHangars();
  }, [count]);

  const getHangarMembers = async (hangarId) => {
    const auth_token = localStorage.getItem("auth_token");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/hangars/${hangarId}`,
      {
        headers: {
          Authorization: "Token " + auth_token,
        },
      }
    );
    if (!response.ok) {
      return new Error("An error in the response");
    }

    const result = await response.json();
    console.log(result.data);
    setHangarMembers(result.data);
  };

  const createHangar = async () => {
    const auth_token = localStorage.getItem("auth_token");
    const data = {
      hangar_name: newHangarName,
    };

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/hangars/`,
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
    console.log(result);
    setCount((prev) => prev + 1);
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="my-3">All Hangars</h3>
      <div className="hangar-create-card">
        <div className="hangar-details">
          <input
            type="text"
            placeholder="name"
            value={newHangarName}
            onChange={(e) => setNewHangarName(e.target.value)}
          />
          <button className="mt-2 link create-hangar" onClick={createHangar}>
            <div className="nav-txt">Create</div>
          </button>
        </div>
      </div>
      {hangars &&
        hangars.map((hangar) => (
          <Tilt className="hangar-card" key={hangar.id}>
            <div
              className="hangar-details"
              onClick={() => {
                setCurrentHangarId(hangar.id);
                getHangarMembers(hangar.id);
              }}
            >
              <h5>{hangar.name}</h5>
            </div>
          </Tilt>
        ))}
    </div>
  );
};

export default AllGroups;
