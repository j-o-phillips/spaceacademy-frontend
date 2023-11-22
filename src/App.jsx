import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./hocs/Layout";

import Home from "./pages/Home";
import Register from "./pages/Register";
import UserGroup from "./pages/UserGroup";
import Login from "./pages/Login";
import SolarSystemMap from "./pages/SolarSystemMap";
import PlanetView from "./pages/PlanetView";
import CardDetails from "./pages/CardDetails";
import MyShip from "./pages/MyShip";
import Flight from "./pages/Flight";

import NavBar from "./components/Navbar";
function App() {
  const [userData, setUserData] = useState({});

  return (
    <main className="App">
      <>
        <div className="full-page">
          <div className="nav">
            <NavBar userData={userData} setUserData={setUserData} />
          </div>
          <div className="page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={<Login setUserData={setUserData} />}
              />
              <Route path="/dorm" element={<UserGroup />} />
              <Route path="/map" element={<SolarSystemMap />} />
              <Route path="/ship" element={<MyShip />} />
              <Route path="/ship/flight" element={<Flight />} />
              <Route path="/map/:planetName" element={<PlanetView />} />
              <Route
                path="/map/:planetName/:categoryId/:cardId"
                element={<CardDetails />}
              />
            </Routes>
          </div>
        </div>
      </>
    </main>
  );
}

export default App;
