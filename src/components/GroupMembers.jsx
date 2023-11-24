import React from "react";
import Tilt from "react-parallax-tilt";

const GroupMembers = ({ hangarMembers, currentHangarId }) => {
  const cardBackground =
    "linear-gradient(144deg, #40feff, #405aff 50%, #3a0271)";
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
      <div className="d-flex overflow_auto h-100 flex-wrap justify-content-center ">
        {hangarMembers.length === 0 ? (
          <div className="message-container d-flex flex-column justify-content-center text-center mx-5">
            <h4>
              It's more fun to explore with friends. Select and join a hangar to
              meet other pilots. Or create one yourself...
            </h4>
          </div>
        ) : (
          hangarMembers.map((profile) => (
            <Tilt
              className="datacard "
              style={{
                backgroundImage: cardBackground,
                height: "170px",
                width: "150px",
              }}
              key={profile.id}
            >
              <div className="datacard-details">
                <h5>{profile.username}</h5>
                <div>
                  <p>💰: {profile.credits}</p>
                  <p>
                    <span className="XP">XP</span>: {profile.experience}
                  </p>
                  <p>🏆: {profile.prestige}</p>
                </div>
              </div>
            </Tilt>
          ))
        )}
      </div>
      {currentHangarId && (
        <div>
          <button
            className="button bg-transparent mb-4 mx-1 mt-2"
            onClick={joinHangar}
          >
            <div className="button-txt">Join Hangar</div>
          </button>
          <button
            className="button bg-transparent mb-4 mx-1 mt-2"
            onClick={leaveHangar}
          >
            <div className="button-txt">Leave Hangar</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupMembers;
