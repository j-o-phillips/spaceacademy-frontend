import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserData }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    const data = {
      username: username,
      password: password,
    };

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/learn/login/`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            btoa(
              `${import.meta.env.VITE_APP_USER}:${
                import.meta.env.VITE_APP_PASSWORD
              }`
            ),
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("An error in the response");
    }

    const result = await response.json();

    localStorage.setItem("auth_token", result.token);
    setUserData(result);
    console.log(result);
    navigate("/dorm");
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center h-100 text-white register-cont">
      <h1>Login</h1>

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
      <button onClick={handleLogin}>
        <div>Login User</div>
      </button>
    </div>
  );
};

export default Login;
