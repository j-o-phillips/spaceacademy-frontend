import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ProfileProvider>
    <Router>
      <App />
    </Router>
  </ProfileProvider>
  // </React.StrictMode>
);
