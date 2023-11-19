import React, { useState } from "react";

const Login = ({ setUserData }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    const data = {
      username: username,
      password: password,
    };

    const response = await fetch("http://127.0.0.1:8000/learn/login/", {
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
    });
    if (!response.ok) {
      throw new Error("An error in the response");
    }

    const result = await response.json();

    localStorage.setItem("auth_token", result.token);
    setUserData(result);
    console.log(result);
  };

  // const checkAuth = async () => {
  //   const response = await fetch("http://127.0.0.1:8000/learn/authenticated/");
  //   if (!response.ok) {
  //     throw new Error("An error in the response");
  //   }

  //   const result = await response.json();
  //   console.log(result);
  // };

  return (
    <div>
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
      <button onClick={handleLogin}>Login User</button>
    </div>
  );
};

export default Login;
