import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Tilt from "react-parallax-tilt";
import ChooseCat from "../components/ChooseCat";
import { Link, useParams } from "react-router-dom";

import stars from "../assets/img/Stars.png";

import "../assets/css/PlanetView.css";

const PlanetView = () => {
  const [categories, setCategories] = useState([]);
  const [datacards, setDataCards] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const { planetName } = useParams();

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
          <Tilt className="datacard" key={datacard.id}>
            <Link className="datacard-link" to={`${categoryId}/${datacard.id}`}>
              <div className="datacard-details">
                <div>{datacard.title}</div>
                <div>Value: {datacard.reward_credits}</div>
                <div>Exp: {datacard.reward_exp}</div>
              </div>
            </Link>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default PlanetView;
