import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";

import "../assets/css/UserGroup.css";
import { useProfileContext } from "../context/ProfileContext";
import { getUserProfileFunc } from "../controllers/userProfile";

const UserGroup = () => {
  const [userProfile, setUserProfile] = useState("");
  const { profileData, setProfileData } = useProfileContext();

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    const getUserProfile = async () => {
      const auth_token = localStorage.getItem("auth_token");
      const result = await getUserProfileFunc(auth_token);
      setUserProfile(result);
      setProfileData(result);
      console.log(result);
    };

    getUserProfile();
  }, []);

  return (
    <div className="dorm-container">
      <h1>My Dormitory</h1>
      <div className="d-flex">
        <Tilt className="profile-card">
          <div className="profile-card-details">
            {userProfile && (
              <>
                <h3>{userProfile.username}</h3>
                <p>First name: {userProfile.profile.first_name} </p>
                <p>Surname: {userProfile.profile.last_name}</p>
                <p>Credits: {userProfile.profile.credits}</p>
                <p>Exp: {userProfile.profile.experience}</p>
                <p>Prestige: {userProfile.profile.prestige}</p>
              </>
            )}
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default UserGroup;
