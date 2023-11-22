import React from "react";
import Tilt from "react-parallax-tilt";

const GroupMembers = ({ hangarMembers, currentHangarId }) => {
  const joinHangar = async (questionId) => {
    const auth_token = localStorage.getItem("auth_token");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/hangars/${currentHangarId}/`,
      {
        method: "POST",
        headers: {
          Authorization: "Token " + auth_token,
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("An error in the response");
    }

    const result = await response.json();
    console.log(result);
  };

  const leaveHangar = async (questionId) => {
    const auth_token = localStorage.getItem("auth_token");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/hangars/${currentHangarId}/`,
      {
        method: "PUT",
        headers: {
          Authorization: "Token " + auth_token,
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("An error in the response");
    }

    const result = await response.json();
    console.log(result);
  };
  return (
    <div className="d-flex flex-column align-items-center h-100 ">
      <div className="d-flex overflow_auto h-100">
        {hangarMembers.length === 0 ? (
          <div className="message-container d-flex flex-column justify-content-center text-center mx-5">
            <h4>
              It's more fun to explore with friends. Select and join a hangar to
              meet other pilots. Or create one yourself...
            </h4>
          </div>
        ) : (
          hangarMembers.map((profile) => (
            <Tilt className="profile-card m-4 mt-5" key={profile.id}>
              <div className="profile-details">
                <h5>{profile.username}</h5>
                <p>Credits: {profile.credits}</p>
                <p>Exp: {profile.experience}</p>
                <p>Prestige: {profile.prestige}</p>
              </div>
            </Tilt>
          ))
        )}
      </div>
      {currentHangarId && (
        <div>
          <button className="link bg-transparent mb-4" onClick={joinHangar}>
            <div className="nav-txt">Join Hangar</div>
          </button>
          <button className="link bg-transparent mb-4" onClick={leaveHangar}>
            <div className="nav-txt">Leave Hangar</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupMembers;
