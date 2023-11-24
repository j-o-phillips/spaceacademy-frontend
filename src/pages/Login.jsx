import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../controllers/auth";

const Login = ({ setUserData }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = {
      username: username,
      password: password,
    };

    const result = await login(data);

    if (!result.token) {
      setMessageCount(1);
      throw new Error("Invalid Credentials");
    }

    localStorage.setItem("auth_token", result.token);
    setUserData(result);
    navigate("/home");
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center h-100 text-white register-cont">
        <h1>Login</h1>

        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="button" onClick={handleLogin}>
          <div className="button-txt">Login User</div>
        </button>
      </div>
      {messageCount === 1 && (
        <div className="alert d-flex flex-column align-items-center justify-content-around">
          <h4>Invalid credentials</h4>
          <button className="button" onClick={() => setMessageCount(0)}>
            <div className="button-txt">Close</div>
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
