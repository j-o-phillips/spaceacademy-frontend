import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Tilt from "react-parallax-tilt";
import ChooseCat from "../components/ChooseCat";
import { Link, useParams, useNavigate } from "react-router-dom";

import stars from "../assets/img/Stars.png";

import "../assets/css/PlanetView.css";
import { Canvas } from "@react-three/fiber";
import CloseUp from "../components/planets/CloseUp";
import { OrbitControls } from "@react-three/drei";

const PlanetView = () => {
  const [categories, setCategories] = useState([]);
  const [datacards, setDataCards] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const { planetName } = useParams();

  let cardBackground;
  switch (planetName) {
    case "mathematics":
      cardBackground = "linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb)";
      break;
    case "history":
      cardBackground = "linear-gradient(144deg, #57ff40, #f3d642 50%, #eb9900)";
      break;
    case "biology":
      cardBackground = "linear-gradient(144deg, #ff4094, #424ef3 50%, #00ebe4)";
      break;
    case "physics":
      cardBackground = "linear-gradient(144deg, #fffd40, #42f398 50%, #0093eb)";
      break;
    case "music":
      cardBackground = "linear-gradient(144deg, #ffb940, #ffb940 50%, #eb0001)";
      break;
    case "geography":
      cardBackground = "linear-gradient(144deg, #5040ff, #40ffa6 50%, #00caeb)";
      break;
    case "computer_science":
      cardBackground = "linear-gradient(144deg, #40feff, #405aff 50%, #3a0271)";
      break;
  }

  useEffect(() => {
    const getCategories = async () => {
      const auth_token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/learn/${planetName}/categories/`,
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
      setCategories(result.data);
      console.log(result.data);
    };

    getCategories();
  }, []);

  const getDataCards = async (categoryId) => {
    const auth_token = localStorage.getItem("auth_token");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/learn/categories/${categoryId}`,
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
    setDataCards(result.data);
    console.log(result.data);
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ backgroundImage: `url(${stars})` }}
    >
      <nav className="choose-cat">
        {categories.map((category) => (
          <button
            className="button mx-3 mt-3"
            key={category.id}
            onClick={() => {
              setCategoryId(category.id);
              getDataCards(category.id);
            }}
          >
            <div className="button-txt">{category.name}</div>
          </button>
        ))}
      </nav>
      <h3 className="align-self-center text-white my-4">
        Datacards left to discover:
      </h3>
      <div className="datacard-container">
        {datacards.map((datacard) => (
          <Tilt
            className="datacard"
            style={{
              backgroundImage: cardBackground,
            }}
            key={datacard.id}
          >
            <Link className="datacard-link" to={`${categoryId}/${datacard.id}`}>
              <div className="datacard-details">
                <div>{datacard.title}</div>
                <div>
                  <div className="d-inline mx-2">
                    💰 {datacard.reward_credits}
                  </div>
                  <div className="d-inline mx-3">
                    <span className="XP">XP</span>
                    {datacard.reward_exp}
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
        ))}
      </div>
      {datacards.length === 0 ? (
        <div className="d-flex justify-content-center">
          <div className="planet-canvas-cont">
            <Canvas>
              <ambientLight intensity={0.5} />

              <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
              <directionalLight intensity={7} position={[8, 10, 2]} />
              <CloseUp planetName={planetName} />
            </Canvas>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default PlanetView;
