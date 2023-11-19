import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ChooseCat from "../components/ChooseCat";
import { Link, useParams } from "react-router-dom";

const PlanetView = () => {
  const [categories, setCategories] = useState([]);
  const [datacards, setDataCards] = useState([]);
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
    <div>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => {
            getDataCards(category.id);
          }}
        >
          {category.name}
        </button>
      ))}
      {datacards.map((datacard) => (
        <Link to={`${datacard.id}`}>
          <Card style={{ width: "18rem" }}>
            <Card.Title>{datacard.title}</Card.Title>
            <Card.Subtitle>Value: {datacard.reward_credits}</Card.Subtitle>
            <Card.Subtitle>Exp: {datacard.reward_exp}</Card.Subtitle>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PlanetView;
