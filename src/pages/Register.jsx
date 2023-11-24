import React, { useState } from "react";

import "../assets/css/Register.css";
import { useNavigate } from "react-router-dom";
import { register } from "../controllers/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [messageCount, setMessageCount] = useState(0);

  const navigate = useNavigate();

  const handleRegister = async () => {
    const data = {
      username: username,
      password: password,
      re_password: rePassword,
    };

    const result = await register(data);
    if (result.success) {
      setMessageCount(1);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center h-100 text-white register-cont">
        <h1>Sign up</h1>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          value={rePassword}
          placeholder="confirm password"
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
        />
        <button className="button" onClick={handleRegister}>
          <div className="button-txt">Register User</div>
        </button>
      </div>
      {messageCount === 1 && (
        <div className="alert d-flex flex-column align-items-center justify-content-around">
          <h4>Welcome {username}</h4>
          <button
            className="button"
            onClick={() => {
              setMessageCount(0);
              navigate("/login");
            }}
          >
            <div className="button-txt">Close</div>
          </button>
        </div>
      )}
    </>
  );
};

export default Register;
