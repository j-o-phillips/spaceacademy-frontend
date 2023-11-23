import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Home.css";

import stars from "../assets/img/Stars.png";
import system from "../assets/img/System.png";
import ship from "../assets/img/Ship.png";

const Home = () => {
  return (
    <div
      className="container-fluid home-container"
      style={{ backgroundImage: `url(${stars})` }}
    >
      <div className="container d-flex flex-column align-items-center h-100 mt-5">
        <div>
          <h1 className="text-white mt-5">Space Academy</h1>
        </div>

        <div
          className="d-flex w-100 mt-5 rounded justify-content-center"
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
          className="d-flex w-100 mt-5 rounded justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="d-flex justify-content-center w-45 m-4">
            <img src={ship} alt="" />
          </div>
          <div className="text-white w-45 d-flex justify-content-center align-items-center m-4 ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
            officiis repudiandae enim recusandae explicabo sed! Ab impedit hic
            id repellendus consectetur ipsam cumque. Iure assumenda vitae
            molestias porro debitis quidem.
          </div>
        </div>

        <div
          className="d-flex w-100 mt-5 rounded justify-content-center"
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

        <div>
          <Link className="button m-4" to="/login">
            <div className="button-txt">Login</div>
          </Link>
          <Link className="button m-4" to="/register">
            <div className="button-txt">Sign Up</div>
          </Link>
        </div>

        <footer className="d-flex justify-content-center">
          <p className="text-white">Copyright Jake Phillips 2023</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
