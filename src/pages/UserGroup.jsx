import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

import "../assets/css/UserGroup.css";

const UserGroup = () => {
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
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
      setUserProfile(result);
      console.log(result);
    };

    getUserProfile();
  }, []);
  return (
    <div className="dorm-container">
      <h1>My Dormitory</h1>
    </div>
  );
};

export default UserGroup;
