import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import "../assets/css/SolarSystemMap.css";
import SolarSystem3D from "../components/SolarSystem3D";
import SolarOverlay from "../components/SolarOverlay";
import { useEffect, useState } from "react";

const SolarSystemMap = () => {
  const [currentPlanet, setCurrentPlanet] = useState("");
  return (
    <>
      <div className="solar-three">
        <SolarOverlay currentPlanet={currentPlanet} />
        <Canvas camera={{ position: [40, 15, 0], fov: 25 }}>
          <SolarSystem3D setCurrentPlanet={setCurrentPlanet} />
        </Canvas>
      </div>
    </>
  );
};

export default SolarSystemMap;
