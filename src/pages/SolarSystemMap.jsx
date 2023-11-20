import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import "../assets/css/SolarSystemMap.css";
import SolarSystem3D from "../components/SolarSystem3D";
import SolarOverlay from "../components/SolarOverlay";
import { useState } from "react";

const SolarSystemMap = () => {
  const [currentPlanet, setCurrentPlanet] = useState("");
  return (
    <>
      <div className="solar-three">
        <SolarOverlay currentPlanet={currentPlanet} />
        <Canvas camera={{ position: [50, 40, 0], fov: 25 }}>
          <SolarSystem3D setCurrentPlanet={setCurrentPlanet} />
        </Canvas>
      </div>
    </>
  );
};

export default SolarSystemMap;
