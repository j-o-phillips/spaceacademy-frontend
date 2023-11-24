import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Home.css";

import stars from "../assets/img/Stars.png";
import system from "../assets/img/System.png";
import ship from "../assets/img/Ship.png";
import cards from "../assets/img/Card.png";

const Home = () => {
  return (
    <div
      className="container-fluid home-container"
      style={{ backgroundImage: `url(${stars})` }}
    >
      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="hero">
          <h1 className="mt-5 title">Space Academy</h1>
        </div>
        <div>
          <Link className="button m-4" to="/login">
            <div className="button-txt">Login</div>
          </Link>
          <Link className="button m-4" to="/register">
            <div className="button-txt">Sign Up</div>
          </Link>
        </div>

        <div
          className="d-sm-flex w-100 mt-5 rounded justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="text-white w-45 d-flex justify-content-center align-items-center m-4 ">
            Explore an undiscovered galaxy and discover it's secrets...
          </div>
          <div className="d-flex justify-content-center w-45 m-4">
            <img src={system} alt="" />
          </div>
        </div>

        <div
          className="d-sm-flex w-100 mt-5 rounded justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="d-flex justify-content-center w-45 m-4">
            <img src={cards} alt="" />
          </div>
          <div className="text-white w-45 d-flex justify-content-center align-items-center m-4 ">
            With knowledge you can unlock each planets datacards and uncover
            it's mysteries...
          </div>
        </div>

        <div
          className="d-sm-flex w-100 mt-5 rounded justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="text-white w-45 d-flex justify-content-center align-items-center m-4 ">
            Use your hard-earned credits to upgrade your ship to battle more
            powerful enemies...
          </div>
          <div className="d-flex justify-content-center w-45 m-4">
            <img src={ship} alt="" />
          </div>
        </div>

        <footer className="d-flex justify-content-center">
          <p className="text-white">Copyright Jake Phillips 2023</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
