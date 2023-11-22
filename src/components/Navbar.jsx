import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "../assets/css/Navbar.css";
import { useProfileContext } from "../context/ProfileContext";

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
    console.log(authToken);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/learn/logout/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("An error in the response");
    }

    localStorage.removeItem("auth_token");
    const result = await response.json();
    setUserData("");
    setProfileData("");
    setIsLoggedIn(false);
    console.log(result);
    navigate("/");
  };
  return (
    <div className="nav-container">
      <div className="links">
        <NavLink to="/" className="logo">
          SA
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink to="/dorm" className="link">
              <div className="nav-txt">Hangar</div>
            </NavLink>
            <NavLink to="/map" className="link">
              <div className="nav-txt">Explore!</div>
            </NavLink>
            <NavLink to="/ship" className="link">
              <div className="nav-txt">Ship</div>
            </NavLink>
          </>
        )}
      </div>

      <div className="userCred">
        {isLoggedIn && (
          <div className="usercred-container">
            {profileData && (
              <>
                <p>username: {profileData.username}</p>
                <p>credits: {profileData.profile.credits}</p>
                <p>experience: {profileData.profile.experience}</p>
                <p>prestige: {profileData.profile.prestige}</p>
              </>
            )}

            <button className="logout" onClick={logOut}>
              <div>Log Out</div>
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <>
            <NavLink to="/register" className="link">
              <div className="nav-txt">Sign up</div>
            </NavLink>
            <NavLink to="/login" className="link">
              <div className="nav-txt">Login</div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
