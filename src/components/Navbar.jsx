import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "../assets/css/Navbar.css";
import { useProfileContext } from "../context/ProfileContext";
import { logout } from "../controllers/auth";

import NavDropdown from "react-bootstrap/NavDropdown";

const Navbar = ({ userData, setUserData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { profileData, setProfileData } = useProfileContext();

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [userData]);

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");

    const getUserProfile = async () => {
      const auth_token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/learn/user/`,
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
      setProfileData(result);
      console.log(result);
    };
    if (auth_token) {
      getUserProfile();
    }
  }, []);

  const logOut = async () => {
    const authToken = localStorage.getItem("auth_token");

    const result = await logout(authToken);

    localStorage.removeItem("auth_token");
    setUserData("");
    setProfileData("");
    setIsLoggedIn(false);

    navigate("/");
  };
  return (
    <div className="nav-container">
      <div className="d-flex align-items-center">
        <NavLink to="/" className="logo mx-3">
          🚀
        </NavLink>

        {isLoggedIn && (
          <>
            <div className="link-toggle">
              <NavLink to="/home" className="button mx-2">
                <div className="button-txt">Home</div>
              </NavLink>
              <NavLink to="/dorm" className="button mx-2">
                <div className="button-txt">Hangar</div>
              </NavLink>
              <NavLink to="/map" className="button mx-2">
                <div className="button-txt">Explore!</div>
              </NavLink>
              <NavLink to="/ship" className="button mx-2">
                <div className="button-txt">Ship</div>
              </NavLink>
            </div>
            <div className="menu-toggle">
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/home">Home</NavDropdown.Item>
                <NavDropdown.Item href="/dorm">Hangar</NavDropdown.Item>
                <NavDropdown.Item href="/map">Map</NavDropdown.Item>
                <NavDropdown.Item href="/ship">Ship</NavDropdown.Item>
              </NavDropdown>
            </div>
          </>
        )}
      </div>

      <div className="userCred">
        {isLoggedIn && (
          <div className="usercred-container">
            {profileData && (
              <>
                <p className="rmv-on-collapse">👤: {profileData.username}</p>
                <p className="rmv-on-collapse">
                  💰: {profileData.profile.credits}
                </p>
                <p className="rmv-on-collapse">
                  <span className="XP">XP</span> :{" "}
                  {profileData.profile.experience}
                </p>
                <p className="rmv-on-collapse">
                  🏆: {profileData.profile.prestige}
                </p>
              </>
            )}

            <button className="button m-3" onClick={logOut}>
              <div className="button-txt">Log Out</div>
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <>
            <NavLink to="/register" className="button m-3">
              <div className="button-txt">Sign up</div>
            </NavLink>
            <NavLink to="/login" className="button m-3">
              <div className="button-txt">Login</div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
