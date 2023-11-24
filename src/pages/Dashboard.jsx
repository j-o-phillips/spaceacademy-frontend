import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { getUserProfileFunc } from "../controllers/userProfile";
import { useProfileContext } from "../context/ProfileContext";
import stars from "../assets/img/Stars.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const cardBackground =
    "linear-gradient(144deg, #40feff, #405aff 50%, #3a0271)";
  const { profileData, setProfileData } = useProfileContext();
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      const auth_token = localStorage.getItem("auth_token");
      const result = await getUserProfileFunc(auth_token);
      setUserProfile(result);
      setProfileData(result);
    };

    getUserProfile();
  }, []);

  return (
    <div
      className="container d-flex flex-column align-items-center text-white  justify-content-center"
      style={{ backgroundImage: `url(${stars})` }}
    >
      <h1 className="display-4 mt-3">Welcome Cadet</h1>
      <div>
        {userProfile && (
          <Tilt
            className="datacard"
            style={{
              backgroundImage: cardBackground,
            }}
          >
            <div className="datacard-details">
              <h5>{userProfile.username}</h5>
              <div>
                <p>💰: {userProfile.profile.credits}</p>
                <p>
                  <span className="XP">XP</span> :{" "}
                  {userProfile.profile.experience}
                </p>
                <p>🏆: {userProfile.profile.prestige}</p>
              </div>
            </div>
          </Tilt>
        )}
      </div>
      <div className="d-md-flex  justify-items-center my-3 ">
        <div
          className="d-flex flex-column align-items-center m-3"
          style={{ width: "220px" }}
        >
          <Link to="/dorm" className="button p-1 mb-2">
            <div className="button-txt ">Visit the hangar</div>
          </Link>
          <p>Meet other pilots and share your knowledge</p>
        </div>
        <div
          className="d-flex flex-column align-items-center m-3"
          style={{ width: "220px" }}
        >
          <Link to="/map" className="button p-1 mb-2">
            <div className="button-txt ">Explore the system</div>
          </Link>
          <p>
            {" "}
            You've arrived in an uncharted solar system. Select the planets to
            land and discover their secrets...
          </p>
        </div>
        <div
          className="d-flex flex-column align-items-center m-3"
          style={{ width: "220px" }}
        >
          <Link to="/ship" className="button p-1 mb-2">
            <div className="button-txt ">My ship</div>
          </Link>
          <p>View and upgrade your ship</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
