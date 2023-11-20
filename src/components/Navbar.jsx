import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import "../assets/css/NavBar.css";

const Navbar = ({ userData, setUserData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const value = useContext(ProfileContext);

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [userData]);

  const logOut = async () => {
    const authToken = localStorage.getItem("auth_token");
    console.log(authToken);
    const response = await fetch("http://127.0.0.1:8000/learn/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("An error in the response");
    }

    localStorage.removeItem("auth_token");
    const result = await response.json();
    setUserData("");
    console.log(result);
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
              Dormitory
            </NavLink>
            <NavLink to="/map" className="link">
              Map
            </NavLink>
            <NavLink to="/ship" className="link">
              Ship
            </NavLink>
            <NavLink to="/help" className="link">
              Help
            </NavLink>
          </>
        )}
      </div>
      <p>{userData.username}</p>
      <div className="userCred">
        {isLoggedIn && (
          <button className="logout" onClick={logOut}>
            <div>Log Out</div>
          </button>
        )}
        {!isLoggedIn && (
          <>
            <NavLink to="/register" className="link">
              Sign up
            </NavLink>
            <NavLink to="/login" className="link">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
