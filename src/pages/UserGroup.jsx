import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { Link, useNavigate } from "react-router-dom";

import "../assets/css/UserGroup.css";
import { useProfileContext } from "../context/ProfileContext";
import { getUserProfileFunc } from "../controllers/userProfile";
import AllGroups from "../components/AllGroups";
import GroupMembers from "../components/GroupMembers";
import Posts from "../components/Posts";

import stars from "../assets/img/Stars.png";

const UserGroup = () => {
  const auth_token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  if (!auth_token) {
    navigate("/");
  }

  const [userProfile, setUserProfile] = useState("");
  const [hangarMembers, setHangarMembers] = useState([]);
  const [currentHangarId, setCurrentHangarId] = useState("");
  const { profileData, setProfileData } = useProfileContext();

  useEffect(() => {
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
    <div
      className="dorm-container"
      style={{ backgroundImage: `url(${stars})` }}
    >
      <div className="all-groups-container">
        <AllGroups
          setHangarMembers={setHangarMembers}
          setCurrentHangarId={setCurrentHangarId}
        />
      </div>
      <div className="member-post-container">
        <div className="member-container">
          <GroupMembers
            hangarMembers={hangarMembers}
            currentHangarId={currentHangarId}
          />
        </div>
        <div className="post-container">
          <Posts currentHangarId={currentHangarId} />
        </div>
      </div>
    </div>
  );
};

export default UserGroup;
